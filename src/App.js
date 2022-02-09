import React, { useRef, useState, useMemo, useCallback } from 'react';
import logo from './logo.svg';
import './App.css';
import Hello from './Hello';
import Wrapper from './Wrapper';
import Counter from './Counter';
import InputSample from './InputSample';
import UserList from './UserList';
import CreateUser from './CreateUser';

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는 중...');
  return users.filter(user => user.active).length;
}

function App() {
  const [inputs, setInputs] = useState({
    username: '',
    email: ''
  });
  const { username, email } = inputs;
  const onChange = useCallback(e => {
      const { name, value } = e.target;
      setInputs(inputs => ({
        ...inputs,
        [name]: value
      }));
    }, []);
  const [users, setUsers] = useState([
    {
        id: 1,
        username: 'velopert',
        email: 'public.velopert@gmail.com',
        active: true
    },
    {
        id: 2,
        username: 'tester',
        email: 'tester@example.com',
        active: false
    },
    {
        id: 3,
        username: 'liz',
        email: 'liz@example.com',
        active: false
    }
  ]);

  const nextId = useRef(4);
  const onCreate = useCallback(() => {
      const user = {
        id: nextId.current,
        username,
        email
      };
      //1. spread 연산자 사용하기
      //setUsers([...users, user]); // 기존 데이터 복사 + 새로운거 추가
      //2. concat() 사용하기
      setUsers(users => users.concat(user)); // 기존 배열을 수정하지 않고 새로운 데이터 추가해서 새로 만들어준다

      // input value clear
      setInputs({
        username: '',
        email: ''
      });
      nextId.current += 1;
    }, [username, email]);

  const onRemove = useCallback(id => {
      setUsers(users => users.filter(user => user.id !== id));
      // user.id가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열로 만듦
    }, []);

  const onToggle = useCallback(id => {
      setUsers(users =>
        users.map(user =>
          user.id === id ? { ...user, active: !user.active } : user
        )
      );

    }, []);
  const count = useMemo(() => countActiveUsers(users), [users]);
  return (
    <>
      <CreateUser 
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
      <div>활성사용자 수 : {count}</div>
    </>
  );
}

export default App;
