import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import CustomHead from '../components/customhead'


export default function Gamepage() {
    return (
      <div className='{styles.container}'>
         <CustomHead/>

          <div className = "boxborder">
           <ul>
              <div> 
               <div className = "questionbox"></div>
               <div className = "scorebox"></div>
              </div>
              <div className = "displaybox">                
               <div style={{top: '40%', left: '40%', fontSize: '300%', color: '#ffffff'}}>ERROR!</div>
              </div>
           </ul>
          </div>


         

      </div>
        
        
       

    )


}






