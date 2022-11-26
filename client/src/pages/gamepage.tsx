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
               <div className = "cardbox1"></div>
               <div className = "cardbox2"></div>
               <div className = "cardbox3"></div>
               <div className = "cardbox4"></div>
               <div className = "cardbox5"></div>
              </div>
           </ul>
          </div>


         

      </div>
        
        
       

    )


}






