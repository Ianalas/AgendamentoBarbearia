import { log } from "console";
import {cpf} from "cpf-cnpj-validator";

let numcpf = cpf.generate();

console.log(typeof numcpf);
