export default function Verify(){

    const inputs = () =>{
        const inputArr = []
        for(let i = 0; i < 6; i++){
            inputArr.push(
            <div className="mm-number-input-item" key={`verify${i}`}>
                <input  maxLength="1" id={`verify${i}`} className="verifyCode" type="text" 
                        onChange={()=>
                            {if(i!==5){
                                document.getElementById(`verify${i+1}`).focus()
                            }else{
                                document.getElementById(`sumbmitVerify`).focus()
                            }
                        }}
                          placeholder="X" />
            </div>
            )
        }
        return inputArr
    }
    
    return (
        <div key={"mm-number"} className="mm-number">
			<div key={"mm-number-container"} className="mm-number-container">
				<div key={"mm-number-input"} className="mm-number-input">
					<div key={"mm-number-input-container animated"} className="mm-number-input-container animated">
                    {inputs()}
					</div>
				</div>
			</div>
		</div>
    )
} 
     
    