import React, { useEffect, useRef, useState } from "react";

interface args {
    reciever: Promise<boolean>,
    resolver: (value: boolean | PromiseLike<boolean>) => void,
    username: string,
    password: string,
    classnums: string,
    action: string,
    repeat: boolean,
    ip: string,
    time: string
}


const ClassChecker = (args: args) => {
    const [Data, setData] = useState<string>('');
    let Username = useRef(args.username);
    let Password = useRef(args.password);
    let ClassNums = useRef(args.classnums);
    let Action = useRef(args.action);
    let Repeat = useRef(args.repeat);
    let IP = useRef(args.ip);
    // eslint-disable-next-line
    let Time = useRef(args.time);
    useEffect(() => {
        console.log(args.reciever);
        args.reciever.then(async (_) => {
            const formData = new FormData();
            formData.set('USER', args.username);
            formData.set('PASSWORD', args.password);
            formData.set('CLASSES', args.classnums);
            formData.set('TIME', args.time);
            while (true) {
                let text = await (await (fetch(IP.current + "/api/" + args.action, {
                    method: 'POST', mode: 'cors', body: formData,
                    headers: {'Access-Control-Allow-Origin':'*'}
                }))).text();
                setData(text);
                let json = JSON.parse(text);
                let classnums = args.classnums.split(" ");
                classnums.map((classnum) => (json[classnum]) ? (Repeat.current = false) : (undefined));
                await new Promise(resolve => setTimeout(resolve, 1000));
                if (!Repeat.current) {break}
                
            }
            args.resolver(true);
        })
    });

   return (
    <div>
        Username: {Username.current}, Password length: {Password.current.length}
        <br/>
        classnums: {ClassNums.current}
        <br/>
        action: {Action.current}
        <br/>
        repeat?: {Repeat.current ? "true" : "false"}
        {Data.length > 0 && 
        <div>
            {Data}
        </div>
        }
    </div>
  );
};

export { ClassChecker }