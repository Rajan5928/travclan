import React,{useState,useEffect} from "react";

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
      <p>
        <div key={i.id}>
          {i.firstname} {i.lastname}
        </div>
        <div>{toggle ? minBid : maxBid}</div>
      </p>
    );
  }
  return (
    <div className="App">
      <button onClick={()=>setToggle(!toggle)}>Toggle</button>
        {customers_2.map((i) => {
          return generateCustomers(i);
        })}
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
