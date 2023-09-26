const socket = io();

let textarea = document.querySelector('#textbox');
let message_area = document.querySelector('#message_area');

let name;
do{
    name = prompt('please enter your name');
}while(!name);

const makeMessage = (name, ans, type) =>{
    let heading = document.createElement('h2');
    heading.classList.add('inb','self');
    heading.innerText = name;

    let text = document.createElement('p');
    text.innerText = ans;

    let maindiv = document.createElement('div');
    maindiv.classList.add('message',type,'flex');
    maindiv.appendChild(heading);
    maindiv.appendChild(text);

    message_area.appendChild(maindiv);
    scrollhandler();
}

const sendToServer = (name, ans)=> {

    socket.emit('message', {
        user : name,
        msg : ans
    });
}

textarea.addEventListener('keyup', (e)=>{
    if((e.key === "Enter") ){
        let ans = textarea.value;
        ans = ans.trim();
        if(ans != ""){
            makeMessage(name, ans, 'outgoing');
            sendToServer(name, ans);
        }
        textarea.value= "";
    }
})


// recevier end
socket.on('message', (msg)=>{
    makeMessage(msg.user, msg.msg, 'incoming');
})

const scrollhandler = () => {
    message_area.scrollTop = message_area.scrollHeight;
};