
import * as yargs from 'yargs';

const argv = yargs.demandOption('num').argv ;
const num : number | any = argv.num;
export const func = () =>{
    return num ** num ;
}
