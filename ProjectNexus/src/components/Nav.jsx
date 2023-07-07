import { Link } from 'react-router-dom'
import TeamList from './TeamList'
import ProjectList from './ProjectList'


export default function Header () {
    return (
    <div class="navBar">
      <div>
        <a className="menu" href="#">MENU</a>
        <ul className='navBabies'>
          <li><Link to="/TeamList">Teams</Link></li>
          <li><Link to="/ProjectList">Projects</Link></li>
          <li><Link to="/TaskList">Tasks</Link></li>
          <li><Link to="/">Profile</Link></li>
        </ul>
      </div>
    </div>
  )
}

