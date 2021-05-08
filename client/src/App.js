import {useState,useEffect} from 'react';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:5000', { transports: ['websocket', 'polling', 'flashsocket'] });

const App = () => {
  const [name,setName] = useState("");
  const [message,setMessage] = useState("");
  const [nameShow,setNameShow] = useState(true);
  const [chatData,setChatData] = useState([]);
  
  const sentMessage = (e) => {
    e.preventDefault();
    setNameShow(false)
    socket.emit('message',{name,message});
    setMessage("");
  }

  useEffect(()=>{
    socket.on('message',(request)=>{
      setChatData([...chatData,request]);
    })
  },[chatData]);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">Chat</div>
            <div className="card-body">
              {chatData.map(({message,name})=>{
                return <div>
                <h4 className="m-0 p-0 float-right">{message} </h4><small>{name}</small>
              </div>
              })}
              
            </div>
            <div className="card-footer fixed-bottom bottom-0">
              <form action="" onSubmit={(e)=>sentMessage(e)}>
                {nameShow &&
               <div className="input-group input-group-sm mb-3">
               <input 
                 type="text" 
                 className="form-control" 
                 placeholder="Name" 
                 value={name}
                 onChange={(e)=>setName(e.target.value)}
               />
             </div>
               }
              
              <div className="input-group input-group-sm mb-3">
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="message" 
                  value={message}
                  onChange={(e)=>setMessage(e.target.value)}
                />
                <div className="input-group-append">
                    <button className="btn btn-primary" onClick={(e)=>sentMessage(e)}>Sent</button>
                </div>
              </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-2"></div>
      </div>
    </div>
  );
}

export default App;
