import { useState } from "react";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  // const [, setName] = useState("");
  const [error, setError] = useState({});
  const [show, setShow] = useState(false);

  const validateErrors = () => {
    const formError = {};

    if (!name.trim()) {
      formError.name = "Name is Required";
    }

    if (!email) {
      formError.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      formError.email = "Enter a correct Email";
    }

    if (!message) {
      formError.message = "message is required";
    }

    return formError;
  };

  function handleSubmit(e) {
    e.preventDefault();
    const formValidation = validateErrors();


    if (Object.keys(formValidation).length == 0) {
      console.log(name, email, message)
      async function sendRequest(){
        const response = await axios.post("http://localhost:6006/sendMail", { name, email, message });
        if (response) {
          setShow(!show);
          alert("Congrats!! Your mail is send")
        }

      }
      sendRequest();
      setEmail("");
      setName("");
      setMessage("");
    }
    else {
      setError(validateErrors);
    }

  }

  return (
    <>
      <div className="w-80% h-screen flex justify-center items-center bg-orange-100">
        <div className="w-[50%] h-auto">
         
          <h1 className="mx-auto text-center text-3xl text-red-500 font-mono my-3">
            Contact us!
          </h1>

          <div className="m-3 my-5 p-5 bg-red-200 flex flex-col w-full h-full">
            
            <form className="flex flex-col" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                className="m-3 p-3 rounded-md border-2 border-blue-500"
              />

              {error.name && <span className="text-red-500 mb-2">{ error.name}</span>}
              
              <input
                type="email"
                placeholder="you Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="m-3 p-3 rounded-md border-2 border-blue-500"
              />
              {error.email && <p className="text-red-500 mb-2">{error.email}</p>}
                
              <textarea
                type="text"
                placeholder="Enter your Message"
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                className="p-3 text-lg italic m-3 p-3 rounded-md border-2 border-blue-500"
              >
                {message}
              </textarea>
              {error.message && <p className="text-red-500 mb-2">{error.message}</p>}
              

              <input
                type="submit"
                className="bg-blue-500 rounded-lg rounded-lg text-white p-3 w-[50%] mx-auto my-3 hover:bg-blue-800"
              />
            </form>
            {show === true ? <p className="text-center text-green-600 font-semibold text-2xl">Email Send Succesfully</p> : ""}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
