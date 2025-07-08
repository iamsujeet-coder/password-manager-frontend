import axios from "axios";
const BASE_URL="https://password-manager-backend-6gkq.onrender.com/";
export const getPasswords=async ()=>{
  const res=await axios.get(BASE_URL+"/");
  return res.data;

};
 export const addPassword=async (data)=>{
  const res=await axios.post(BASE_URL+"/",data);
    return res.data;

}
 export const deletePassword=async (id)=>{
  const res=await axios.delete(BASE_URL+"/",{
data:{id}});  
return res.data;
};
