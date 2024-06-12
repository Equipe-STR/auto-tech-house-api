import fs from 'fs';
import csv from 'csv-parser';
import MultivariateLinearRegression = require("ml-regression-multivariate-linear")

interface MyData {
  "Leitura Esquerda": string | number;
  "Leitura Direita": string | number;
  "Valor Mapeado": string | number;
}
interface MyDataNumber{
  "Leitura Esquerda": number;
  "Leitura Direita": number;
  "Valor Mapeado": number;
}

const readCSV = (filePath: string): Promise<MyData[]> => {
  return new Promise((resolve, reject) => {
    const results: MyData[] = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data: MyData) => results.push(data))
      .on('end', () => {
        resolve(results);
      })
  });
};

const convertStringsToNumbers = (data: MyData[]): MyDataNumber[] => {
  return data.map(item => {
    return ({
      'Leitura Esquerda': parseInt(item['Leitura Esquerda'] as string, 10),
      'Leitura Direita': parseInt(item['Leitura Direita'] as string, 10),
      'Valor Mapeado': parseFloat((item['Valor Mapeado']as string).replace(',', '.') ) // Usando parseFloat para suportar números grandes e decimais
    })
  });
};

export class RegressionModelSingleton {
    private static instance: MultivariateLinearRegression | null = null;

    public static async getInstance(): Promise<MultivariateLinearRegression> {
        if (!RegressionModelSingleton.instance) {
        const results = await readCSV('./src/utils/dados.csv');
        const resultsNumber = convertStringsToNumbers(results);
        const X = resultsNumber.map((item) => [item['Leitura Esquerda'], item['Leitura Direita']]);
        const Y = resultsNumber.map((item) => [item['Valor Mapeado']]);
        RegressionModelSingleton.instance = new MultivariateLinearRegression(X, Y);
        }
        return RegressionModelSingleton.instance!;
    }
}
  

//   // Exemplo de uso
// (async () => {
//     const regressionModel = await RegressionModelSingleton.getInstance();
//     console.log(regressionModel.predict([1, 2])); // Substitua [1, 2] pelos valores reais de entrada
// })();
