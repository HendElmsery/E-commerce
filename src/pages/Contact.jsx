import React from "react";
import { useState } from "react";
function Contact() {
    const  [count, setcount] = useState(0)

const incrment =()=>{
    setcount(count+1)
}
const decrment = ()=>{
    setcount(count-1)
}
  return (
    <div>
      <h2>counter: {count}</h2>
      <button className="btn btn-primary w-400"  onClick={incrment}>Incrment me</button>
      <button className="btn btn-danger w-400"  onClick={decrment}>Incrment me</button>
      <p>If you have any questions, reach out to us!</p>
    </div>
  );
}

export default Contact;
