import React, { FC, useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Main from './routes/main'

const App: FC = () => {
  const [account, setAccount] = useState<string>('')
  const getAccount = async () => {
    try {
      if (window.ethereum) { // metamask설치되어 있는경우
        // 브라우저에서 metamask 연결 요청하여 account배열 get
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts'
        })
        setAccount(accounts[0])
        return
      }
      alert('Install Meta Mask!') // metamask 설치되지 않은 경우
    } catch(error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getAccount()
  }, [])
  useEffect(() => {
    console.log('account', account)
  }, [account])
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main account={account} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
