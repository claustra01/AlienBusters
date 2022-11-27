import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import CustomHead from '../components/customhead'
type imagelist = string[];
const imagelist = ['1.png','25.png','3.png','4.png','5.png'];

export default function Gamepage() {
    return (
      <div className='{styles.container}'>
         <CustomHead/>

          <div className = "boxborder">
           <ul>
              <div>
              <div className="questionbox" >
                <img src="/1.png" width="60%" style={{left:"20%"}}  alt="aaaa" />
              </div>
            
               <div className = "scorebox"></div>
              </div>
              <div className = "displaybox">

              {/* for (let i = 0; i < 4;i++) 
              {
   <img src="imagelist[i]" className = "cardbox+i"/>
  
} */}
                
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






