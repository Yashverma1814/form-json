import React from 'react'

export const Form = () => {
    const initState = {
        name: "",
        age: "",
        address: "",
        department: "",
        salary: "",
        isMarried: ""
    }
    const [formData, setFormData] = React.useState(initState);
    const [loading,setLoading] = React.useState(false);    
    const [error,setError] = React.useState(false);
    const [data, setData] = React.useState([]);
    const { name, age, address, department, salary, isMarried } = formData;

    React.useEffect(()=>{
        fetchAndUpdateData();
    },[])

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        addData();
    }

    const handleChange = (e) => {
        let { value, name, type, checked } = e.target;
        value = type === checked ? !value : value;
        setFormData((prevFormData)=>({
            ...prevFormData,
            [name]:value
        }))
    }

    const fetchAndUpdateData = () => {
        setLoading(true);
        fetch(`http://localhost:8080/employees`)
            .then((res)=>(res.json()))
            .then((res)=>setData(res))
            .catch((err)=>setError(true))
            .finally(()=>setLoading(false))
    }

    const addData = () => {
        const dataToPost = JSON.stringify(formData);

        fetch(`http://localhost:8080/employees`,{
            method:"POST",
            body:dataToPost,
            headers : {
                "Content-Type":"application/json"
            }
        }).then(()=>{
            console.log("data Posted");
            fetchAndUpdateData();
        })

    }

    return (
        <div className='form-data'>
            <form>
            <label htmlFor="">
                Name :
                <input type="text" name='name' placeholder='Name' value={name} onChange={handleChange} />
            </label>
            <br />
            <label htmlFor="">
                Age :
                <input type="Number" name='age' placeholder='Age' value={age} onChange={handleChange} />
            </label>
            <br />
            <label htmlFor="">
                Address :
                <input type="text" name='address' placeholder='Address' value={address} onChange={handleChange} />
            </label>
            <br />
            <label htmlFor="">
                Department :
                <select name="department" id="department" value={department} onChange={handleChange}>
                    <option value="front-end">Front End</option>
                    <option value="back-end">Back End</option>
                    <option value="full-stack">Full Stack Web Development</option>
                </select>
            </label>
            <br />
            <label htmlFor="">
                Salary :
                <input type="number" name='salary' placeholder='Salary' value={salary} onChange={handleChange} />
            </label>
            <br />
            <label htmlFor="">
                Marital Status :
                <input type="checkbox" name='isMarried' checked={isMarried}  onChange={handleChange} />
            </label>
            <br />
            <input type="submit" onClick={handleSubmit} />
            </form>
            <table>
                <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Address</th>
                    <th>Department</th>
                    <th>Salary</th>
                    <th>isMarried</th>
                </tr>
                {
                    loading?(<h1>Loading....</h1>) 
                    : error?(<h1>Something Went Wrong Start Json Server</h1>) 
                    : (data.map((el)=>(
                        <tr>
                            <td>{el.name}</td>
                            <td>{el.age}</td>
                            <td>{el.address}</td>
                            <td>{el.department}</td>
                            <td>{el.salary}</td>
                            <td>{el.isMarried==="on"?"Yes":"No"}</td>
                        </tr>
                    )))

                }
            </table>
        </div>
    )
}
