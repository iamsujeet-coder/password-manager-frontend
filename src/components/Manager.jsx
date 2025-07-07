
import React, { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

function Manager() {
  const eyeRef = useRef();
  const [form, setForm] = useState({ site: "", userName: "", password: "" })
  const [passwordArray, setpasswordArray] = useState([])
  const passwordRef = useRef()

  const getPasswords = async () => {
    const req = await fetch("http://localhost:3000/")
    const passwords = await req.json()
    // console.log(passwords)
    setpasswordArray(passwords)
  }


  useEffect(() => {
    getPasswords();
  }, [])


  const showPassword = () => {
    passwordRef.current.type = "text";
    if (eyeRef.current.src.includes("eye-cut.svg")) {
      eyeRef.current.src = "icons/eye.svg";
      passwordRef.current.type = "text";

    } else {
      eyeRef.current.src = "icons/eye-cut.svg";
      passwordRef.current.type = "password";
    }
  }

  //   const savePassword = async() => {
  //     if (form.site.length > 3 && form.userName.length > 3 && form.password.length > 3) {

  //     await fetch('http://localhost:3000/', {
  //   method: "DELETE",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({id:form.id })
  // })
  //       setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
  //       await fetch("http://localhost:3000",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...form,id:uuidv4()})})
  //       // localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
  //       // console.log(passwordArray);

  //       setForm({ site: "", userName: "", password: "" })
  //       toast('Saved succeessfully', {
  //         position: "top-right",
  //         autoClose: 5000,
  //         hideProgressBar: false,
  //         closeOnClick: false,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "dark",
  //       });
  //     }
  //     else {
  //       toast('Error:Password not saved')
  //     }

  //   }

  const savePassword = async () => {
   if (form.site.length > 3 && form.userName.length > 3 && form.password.length > 3){
    await fetch('http://localhost:3000/', {
      method: "DELETE", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: form.id })
    })
    const newId = form.id || uuidv4();
    const newEntity = { ...form, id: newId }
    setpasswordArray([...passwordArray, newEntity])
    await fetch("http://localhost:3000", {
      method: "POST", headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newEntity)
    })
    setForm({ site: "", userName: "", password: "" })
    toast('Saved succeessfully', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  }
  else{
    toast('Error:Password not saved')
  }

      
}




const deletePassword = async (id) => {
  toast('Deleted Successfully', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
  // console.log("Deleting password with id: ", id);
  let c = confirm("Do you want to delete this password?");
  if (c) {
    setpasswordArray(passwordArray.filter(item => item.id !== id))
    // localStorage.setItem("passwords:", JSON.stringify(passwordArray.filter(item => item.id !== id)))
    await fetch('http://localhost:3000/', {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    })

  }





}
const editPassword = (id) => {

  console.log("Editing password with id: ", id);
  setForm({ ...passwordArray.filter(i => i.id === id)[0], id: id })
  setpasswordArray(passwordArray.filter(item => item.id !== id))

}





const handleChange = ((e) => {
  setForm({ ...form, [e.target.name]: e.target.value })
})

const copyText = (text) => {
  toast('Copied to clipboard', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
  navigator.clipboard.writeText(text);
}

return (
  <>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-green-50 to-green-200 w-full font-sans flex flex-col items-center">
      {/* Background grid and blur effect */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
      </div>

      <div className="px-2 sm:px-4 md:px-0 py-5 pb-24 max-w-2xl w-full mx-auto flex flex-col items-center">
        <h1 className='text-3xl sm:text-4xl md:text-5xl font-extrabold py-2 text-center tracking-tight drop-shadow-lg text-green-800'>
          <span className='text-green-500'>&lt;</span>
          <span>Pass</span>
          <span className='text-green-500'>OP/&gt;</span>
        </h1>
        <p className='text-green-900 text-base sm:text-lg md:text-xl text-center mb-2 md:mb-4 font-medium'>Your own Password Manager</p>
        <div className="text-black flex flex-col p-4 gap-6 items-center w-full bg-white/90 rounded-2xl shadow-2xl border border-green-200">
          <div className="w-full flex flex-col gap-4">
            <input
              value={form.site}
              placeholder='Enter website URL'
              type="text"
              name='site'
              onChange={handleChange}
              id='site-input'
              className='rounded-xl border-2 border-green-300 w-full p-4 text-lg focus:ring-2 focus:ring-green-400 focus:border-green-500 transition-all duration-150 placeholder-gray-500 shadow-sm bg-white outline-none'
              autoComplete="off"
            />
            <div className="flex flex-row gap-4 w-full flex-wrap">
              <input
                value={form.userName}
                placeholder='Enter Username'
                type="text"
                name='userName'
                onChange={handleChange}
                id='username-input'
                className='rounded-xl border-2 border-green-300 w-full p-4 text-lg focus:ring-2 focus:ring-green-400 focus:border-green-500 transition-all duration-150 placeholder-gray-500 shadow-sm bg-white outline-none'
                autoComplete="off"
              />
              <div className="relative w-full">
                <input
                  ref={passwordRef}
                  value={form.password}
                  placeholder='Enter Password'
                  type="password"
                  name='password'
                  onChange={handleChange}
                  id='password-input'
                  className='rounded-xl border-2 border-green-300 w-full p-4 text-lg pr-12 focus:ring-2 focus:ring-green-400 focus:border-green-500 transition-all duration-150 placeholder-gray-500 shadow-sm bg-white outline-none'
                  autoComplete="off"
                />
                <span onClick={showPassword} className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer'><img className='p-1' src="icons/eye.svg" alt="Show/Hide Password" width={"26"} ref={eyeRef} /></span>
              </div>
            </div>
          </div>
          <button className='flex justify-center items-center gap-2 py-3 border text-center bg-gradient-to-r from-green-400 to-green-600 text-white rounded-full px-12 w-fit hover:from-green-500 hover:to-green-700 border-green-900 shadow-lg transition-all duration-200 text-lg font-semibold active:scale-95 mt-2' onClick={savePassword}>
            <lord-icon src="https://cdn.lordicon.com/efxgwrkc.json" trigger="hover"></lord-icon>
            Save
          </button>
        </div>
        <div className="w-full overflow-x-auto mt-8">
          <h2 className='font-bold text-2xl py-4 text-green-900 text-left'>Your Passwords</h2>
          {passwordArray.length === 0 && <div className='text-center text-gray-500'>No passwords to show</div>}
          {passwordArray.length !== 0 && (
            <>
              {/* Desktop Table */}
              <div className="overflow-x-auto w-full hidden sm:block">
                <table className="min-w-full rounded-xl overflow-hidden text-base bg-white/95 shadow-xl border border-green-200">
                  <thead className='bg-green-800 text-white'>
                    <tr>
                      <th className='py-3 px-4 font-semibold text-lg text-left'>Site</th>
                      <th className='py-3 px-4 font-semibold text-lg text-left'>Username</th>
                      <th className='py-3 px-4 font-semibold text-lg text-left'>Password</th>
                      <th className='py-3 px-4 font-semibold text-lg text-center'>Actions</th>
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-green-100'>
                    {passwordArray.map((item, index) => (
                      <tr key={index} className="hover:bg-green-50 transition-colors">
                        <td className='px-4 py-3 align-middle'>
                          <div className="flex items-center gap-2">
                            <a href={item.site} target='_blank' rel='noopener noreferrer' className='truncate max-w-[120px] sm:max-w-[180px] text-green-700 font-medium hover:underline'>{item.site}</a>
                            <button className='ml-1 text-green-700 hover:text-green-900 focus:outline-none' title='Copy Site' onClick={() => { copyText(item.site) }}>
                              <i className="fa-solid fa-copy"></i>
                            </button>
                          </div>
                        </td>
                        <td className='px-4 py-3 align-middle'>
                          <div className="flex items-center gap-2">
                            <span className='truncate max-w-[120px] sm:max-w-[180px]'>{item.userName}</span>
                            <button className='ml-1 text-green-700 hover:text-green-900 focus:outline-none' title='Copy Username' onClick={() => { copyText(item.userName) }}>
                              <i className="fa-solid fa-copy"></i>
                            </button>
                          </div>
                        </td>
                        <td className='px-4 py-3 align-middle'>
                          <div className="flex items-center gap-2">
                            <span className='truncate max-w-[120px] sm:max-w-[180px]'>{"*".repeat(item.password.length)}</span>
                            <button className='ml-1 text-green-700 hover:text-green-900 focus:outline-none' title='Copy Password' onClick={() => { copyText(item.password) }}>
                              <i className="fa-solid fa-copy"></i>
                            </button>
                          </div>
                        </td>
                        <td className='px-4 py-3 align-middle text-center'>
                          <div className='flex justify-center items-center gap-4'>
                            <button className="text-blue-600 hover:text-blue-800 transition-colors focus:outline-none" title='Edit' onClick={() => { editPassword(item.id) }}>
                              <i className="fa-solid fa-pen-to-square"></i>
                            </button>
                            <button className="text-red-600 hover:text-red-800 transition-colors focus:outline-none" title='Delete' onClick={() => { deletePassword(item.id) }}>
                              <i className="fa-solid fa-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Mobile Card List */}
              <div className="flex flex-col gap-4 w-full sm:hidden">
                {passwordArray.map((item, index) => (
                  <div key={index} className="bg-white/95 rounded-xl shadow-xl border border-green-200 p-4 flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-green-800">Site:</span>
                      <div className="flex items-center gap-2">
                        <a href={item.site} target='_blank' rel='noopener noreferrer' className='truncate max-w-[120px] text-green-700 font-medium hover:underline'>{item.site}</a>
                        <button className='ml-1 text-green-700 hover:text-green-900 focus:outline-none' title='Copy Site' onClick={() => { copyText(item.site) }}>
                          <i className="fa-solid fa-copy"></i>
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-green-800">Username:</span>
                      <div className="flex items-center gap-2">
                        <span className='truncate max-w-[120px]'>{item.userName}</span>
                        <button className='ml-1 text-green-700 hover:text-green-900 focus:outline-none' title='Copy Username' onClick={() => { copyText(item.userName) }}>
                          <i className="fa-solid fa-copy"></i>
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-green-800">Password:</span>
                      <div className="flex items-center gap-2">
                        <span className='truncate max-w-[120px]'>{item.password}</span>
                        <button className='ml-1 text-green-700 hover:text-green-900 focus:outline-none' title='Copy Password' onClick={() => { copyText(item.password) }}>
                          <i className="fa-solid fa-copy"></i>
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center gap-2 pt-2">
                      <span className="font-semibold text-green-800">Actions:</span>
                      <div className="flex items-center gap-4">
                        <button className="text-blue-600 hover:text-blue-800 transition-colors focus:outline-none" title='Edit' onClick={() => { editPassword(item.id) }}>
                          <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button className="text-red-600 hover:text-red-800 transition-colors focus:outline-none" title='Delete' onClick={() => { deletePassword(item.id) }}>
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  </>
);
}

export default Manager