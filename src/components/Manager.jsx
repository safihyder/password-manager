import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';
const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])
    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setpasswordArray(JSON.parse(passwords))
        }
    }, [])
    const copyText=(text)=>{
        toast('Copied to Clipboard', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light"
            });
        navigator.clipboard.writeText(text)
    }
    const showPassword = () => {
        passwordRef.current.type = "text"
        if (ref.current.src.includes("icons/closeeye.png")) {
            ref.current.src = "icons/openeye.png"
            passwordRef.current.type = "password"

        } else {
            ref.current.src = "icons/closeeye.png"
            passwordRef.current.type = "text"

        }
        // alert("Show the password")
    }
    const editPassword=(id)=>{
        setform(passwordArray.filter(i=>i.id===id)[0])
        setpasswordArray(passwordArray.filter(item=>item.id!==id))
    }
    const deletePassword=(id)=>{
        const c=confirm("Do you really want to delete this password?")
        if(c){
            setpasswordArray(passwordArray.filter(item=>item.id!==id))
            localStorage.setItem('passwords', JSON.stringify(passwordArray.filter(item=>item.id!==id)))
        }
        toast('Password Deleted!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light"
            });
    }
    const savePassword = () => {
        if(form.site.length >3 && form.username.length >3 && form.password.length >3){
            toast('Password saved!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light"
        });
            setpasswordArray([...passwordArray,{ ...form,id:uuidv4()}])
            localStorage.setItem('passwords', JSON.stringify([...passwordArray, { ...form,id:uuidv4()}]))
            setform({ site: "", username: "", password: "" })
            console.log(passwordArray)
    }else{
        toast('Error: Password not saved!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light"
        });
    }
    }
    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }
    return (
        <>
        <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition= "Bounce"
/>
{/* Same as */}
<ToastContainer />
<div className="absolute top-0 z-[-2] h-screen w-screen rotate-180 transform"></div>
            <div className="p-3 md:mycontainer min-h-[87vh]">
                <h1 className='text-4xl font-bold text-center'>        <span className="text-green-500">&lt;</span>
                    <span><span>Secure</span></span>
                    <span className="text-green-500">P*ss&gt;</span></h1>
                <p className='text-center text-green-900 text-lg:'>You own password manager</p>
                <div className="text-black gap-8 flex flex-col p-4 items-center ">
                    <input value={form.site} name='site' onChange={handleChange} placeholder='Enter the website URL' type='text' className="rounded-full border border-green-500 w-full p-4 py-1"></input>
                    <div className="flex gap-8 w-full justify-between">
                        <input value={form.username} name='username' onChange={handleChange} placeholder='Enter username' type="text" className="rounded-full border border-green-500 w-full p-4 py-1" />
                        <div className="relative">
                            <input ref={passwordRef} value={form.password} name='password' onChange={handleChange} placeholder='Enter password' type="password" className="rounded-full border border-green-500 w-full p-4 py-1" />
                            <span className='absolute right-[3px] top-[3px] cursor-pointer' onClick={showPassword}>
                                <img ref={ref} className='p-1' width={25} src="./icons/openeye.png" alt="" />
                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='flex justify-center items-center bg-green-500 hover:bg-green-300 rounded-full px-4 py-2 w-fit gap-2 border text-lg border-green-900' ><img width={26} src='icons/add.gif' alt="" />
                        Save
                    </button>
                </div>
                <div className="passwords">
                    <h2 className="font-bold text-2xl py-4">Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No passwords to show</div>}
                    {passwordArray.length !== 0 &&
                        <table className="table-auto w-full rounded-md overflow-hidden mb-10">
                            <thead className='bg-green-800 text-white'>
                                <tr>
                                    <th className='py-2'>Site</th>
                                    <th className='py-2'>Username</th>
                                    <th className='py-2'>Password</th>
                                    <th className='py-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-100'>
                                {passwordArray.map((item, index) => {
                                    return <tr key={index}>
                                        <td className='py-2 border border-white text-center '>
                                            <div className='flex justify-center items-center'>
                                                <a href={item.site} target='blank'>{item.site}</a>
                                                <img src="icons/copy.gif" className="size-7 cursor-pointer copyBtn" alt="" onClick={()=>{copyText(item.site)}} />
                                            </div>
                                        </td>
                                        <td className='py-2 border border-white text-center'>
                                            <div className='flex justify-center items-center'>
                                                {item.username}<img src="icons/copy.gif" className="size-7 cursor-pointer copyBtn" alt="" onClick={()=>{copyText(item.username)}}  />
                                            </div>
                                        </td>
                                        <td className='py-2 border border-white text-center '>
                                            <div className='flex justify-center items-center'>
                                                {item.password}<img src="icons/copy.gif" className="size-7 cursor-pointer copyBtn" alt="" onClick={()=>{copyText(item.password)}}  />
                                            </div>
                                        </td>
                                        <td className='py-2 border border-white text-center items-center'>
                                            <div className='flex justify-center items-center'>
                                            <img src="icons/edit.gif" onClick={()=>editPassword(item.id)} className="size-7 cursor-pointer editBtn mx-1" alt="" />
                                            <img src="icons/bin.gif" onClick={()=>deletePassword(item.id)}  className="size-7 cursor-pointer binBtn mx-1" alt="" />
                                            </div>
                                        </td>
                                    </tr>
                                })}


                            </tbody>
                        </table>
                    }
                </div>
            </div>
        </>
    )
}

export default Manager