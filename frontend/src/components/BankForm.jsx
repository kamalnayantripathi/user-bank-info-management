import "../stylesheets/BankForm.css"
const BankForm = () => {
    return(
        <>
                <div className="bank-form-container">
                    <h3>Add Bank</h3>
                    <form action="">
                        <input type="text" name="name" id="name" placeholder="Enter Bank Name"/>
                        <input type="text" name="holder" id="holder" placeholder="Enter Holder Name"/>
                        <input type="text" name="account" id="account" placeholder="Enter Account Name"/>
                        <input type="text" name="comfirm" id="comfirm" placeholder="Confirm Account Name"/>
                        <input type="text" name="ifsc" id="ifsc" placeholder="IFSC Code"/>
                        <button>Add Bank</button>
                    </form>
                </div>
        </>
    )
}

export default BankForm;