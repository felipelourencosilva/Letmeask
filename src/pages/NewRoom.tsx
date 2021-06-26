import { FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/Button'

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import darkModeLogoImg from '../assets/images/dark-mode-logo.svg';
import moonImg from '../assets/images/moon.svg'
import sunImg from '../assets/images/sun.svg'

import { useState } from 'react';
import { database } from '../services/firebase';
import { useTheme } from '../hooks/useTheme';

import '../styles/auth.scss'


export function NewRoom() {
  const { user } = useAuth();
  const history = useHistory();
  const [newRoom, setNewRoom ] = useState('');
  const { theme, toggleTheme } = useTheme()

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if(newRoom.trim() === '') {
      return;
    }

    const roomRef = database.ref('rooms')

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id
    })

    history.push(`/rooms/${firebaseRoom.key}`)
  }

  return(
    <div id="page-auth" className={theme}>
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;E ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo real</p>
      </aside>
      <main>
        <div className="main-content">
          <button 
            className="changeThemeButton"
            onClick={toggleTheme}>
              <img src={theme === 'light' ? moonImg : sunImg} alt="" />
          </button>
          <img src={theme === 'light' ? logoImg : darkModeLogoImg} alt="Letmeask" />
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input 
              type="text" 
              placeholder="Nome da sala"
              onChange={event => setNewRoom(event.target.value)}
            />
            <Button type="submit">Criar sala</Button>
          </form>

          <p>Quer entrar uma sala existente? <Link to="/">clique aqui</Link></p>
        </div>
      </main>
    </div>
  )
}