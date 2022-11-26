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
                
              <img src="/1.png" className = "cardbox1"/>
               <img src="/2.png" className = "cardbox2"/>
               <img src="/3.png" className = "cardbox3"/>
               <img src="/4.png" className = "cardbox4"/>
               <img src="/5.png" className = "cardbox5"/>
              </div>
           </ul>
          </div>


         

      </div>
        
        
       

    )


}






