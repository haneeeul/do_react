import React, { useState, useRef } from 'react';

function InputSample() {
    const [inputs, setInputs] = useState({
        name: '',
        nickname: ''
    });
    const nameInput = useRef(); // ref 객체 생성

    const { name, nickname } = inputs;

    const onChange = (e) => {
        const { value, name } = e.target;
        // inputs[name] = value; 이렇게 수정하면 오류. 불변성을 지킬 수 없기 때문
        // 고칠거면 새로 만들어야 한다.
        setInputs({
            ...inputs, // 기존 객체를 펼쳐서 복사
            [name]: value
        });
    };

    const onReset = () => {
        setInputs({
            name: '',
            nickname: '',
        });
        // nameInput.current == document.querySelector([ref 값을 설정한 DOM])
        nameInput.current.focus();
    };

    return (
        <div>
            <input name="name" placeholder="이름" onChange={onChange} value={name} ref={nameInput} />
            <input name="nickname" placeholder="닉네임" onChange={onChange} value={nickname} />
            <button onClick={onReset}>초기화</button>
            <div>
                <b>값 : </b>
                {name} ({nickname})
            </div>
        </div>
    );
}

export default InputSample;