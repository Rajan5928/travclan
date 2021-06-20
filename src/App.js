import React,{useState,useEffect} from "react";
import Button from '@material-ui/core/Button';
import "./App.css";

const App=()=> {
  const [customers,setCustomers] = useState([]);
  const [customers_2,setCustomers_2] = useState([]);
  const [numPosts,setnumPosts] = useState(13);
  const [toggle,setToggle] = useState(false);

  useEffect(()=>{
    fetch("https://intense-tor-76305.herokuapp.com/merchants")
    .then(response=>response.json())
    .then(json=>{setCustomers(json);
    setCustomers_2(json);}
    )
  },[])
 
  const handleClick=(e)=> {
    setnumPosts(e.target.value);
    setCustomers_2(customers.slice(0, e.target.value));
  }
  const generateCustomers=(i)=>{
    let maxBid = -1;
    let minBid = 100000;
    if (i.bids.length === 0) {
      maxBid = "null";
      minBid = "null";
    } else {
      for (let j of i.bids) {
        if (j.amount > maxBid) {
          maxBid = j.amount;
        }
        if (j.amount < minBid) {
          minBid = j.amount;
        }
      }
    }
    return (
      
        <li key={i.id}>
          <span>{i.firstname} {i.lastname}</span>
          <span><img src={i.avatarUrl} alt="some error"/></span>
          <span>{i.email}</span>
          <span>{i.phone}</span>
          <span>{i.hasPremium}</span>
          <span>{toggle ? minBid : maxBid}</span>
        </li>
      
    );
  }
  return (
    <div className="App">
      <Button style={{display:"block",marginLeft: "auto",
        marginRight: "auto"}} variant="contained" color="secondary" onClick={()=>setToggle(!toggle)}>Toggle</Button>
      <ol>
        {customers_2.map((i) => {
          return generateCustomers(i);
        })}
      </ol>
        <select
          style={{
            float: "right",
            marginBottom: "20px",
            fontSize: "25px",
            backgroundColor: "blue",
            color: "white",
            padding: "10px"
          }}
          value={numPosts}
          onChange={handleClick}
        >
          <option value={5}>{5}</option>
          <option value={10}>{10}</option>
          <option value={13}>{13}</option>
        </select>
    </div>
  );
}

export default App;
