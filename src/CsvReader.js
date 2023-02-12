import { useState } from "react";
import { v4 } from 'uuid'

export default function CsvReader () {
    const [csvFile,setCsvFile] = useState();
    const [csvArray, setCsvArray] = useState([]);


    const processCSV = (str, delim=',') => {
        const fileHeader = str.slice(0,str.indexOf('\n')).split(delim);
        const fileRows= str.slice(str.indexOf('\n')+1).split('\n');
console.log(fileHeader);

        const newArray = fileRows.map( row => {
            const values = row.split(delim);
            const eachObject = fileHeader.reduce((obj, fileHeader, i) => {
                obj[fileHeader] = values[i];
                return obj;
            }, {})
            return eachObject;

        })
setCsvArray(newArray)

    }

    const submit=() => {

        const file = csvFile;
        const reader = new FileReader();

        reader.onload = function (e) {
            const text= e.target.result;
            console.log(text);
            processCSV(text);
        }
            
        reader.readAsText(file);

    }


    return (
        <form id="csv-form">
            
            <input type="file" accept=".csv" id="csFile" onChange={(e) => { setCsvFile(e.target.files[0])} }>
            </input>
            

            <button  onClick={(e) => {  
                e.preventDefault()
                 if(csvFile)submit()}} >
                    Submit
                </button>

<br/>

{/* {csvArray.length>0 ? null : null} */}

{csvArray.length>0 ? <>

<ul>
  {csvArray.map(item =>
  <li> {item.name} </li>
  )}
</ul>

</> : null} 

        </form>
    )

}

