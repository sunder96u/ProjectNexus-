import { useState, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Context from '../Context'
import Select from 'react-select'

const CreateProjectModal = ({open, onClose}) => {
  const BASE_URL = "https://projectwrx-back-production.up.railway.app/api/"

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [dateDue, setDateDue] = useState('')
  const [projectLeader, setProjectLeader] = useState('')
  const { userInfo, setUserInfo } = useContext(Context)
  const [teamMembers, setTeamMembers] = useState({})
  const teamName = useParams()

  const projectData = {
    name,
    description,
    dateDue,
    projectLeader
  }

  // work on dynamic all pieces there, maybe a filter until the axios call is made?

  const object = [
    {label: `chris87`, value: `64a8149cc3cd0299e6f1f3af` },
    {label: `Demo1`, value: `64a63f9c8eb8541d68cafc4b`}
  ]

  
  useEffect(() => {
    const getTeamMembers = async () => {
      const users = await axios.get(`${BASE_URL}/team/${teamName.teamName}`)
      for (let i = 0; i < users.data[0].member.length; i++) {
        let userId = users.data[0].member[i]._id
        let userName = users.data[0].member[i].username
        const newObj = []
        newObj['value'] = userId
        newObj['label'] = userName
        //object[i] = newObj
      }
    }
    getTeamMembers()
  }, [])


  const saveProjectData = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}project/`,
        projectData
      )
      console.log('Project created successfully:', response.data)
    } catch (error) {
      console.error('Error creating project:', error)
    }
  }

  const handleSubmitProject = (e) => {
    e.preventDefault()

    if (!name || !description || !dateDue || !teamMembers) {
      return alert('Please fill in all fields')
    }
    setProjectLeader(userInfo.userId)
    
    saveProjectData(projectData)

    setName('')
    setDescription('')
    setDateDue('')
    onClose()

    alert('Project created successfully!')
  }
    
 if (!open) return null
 console.log(open)
  
  return (
    <div className="overlay" onClick={onClose}>
      <div onClick={(e) => {e.stopPropagation()}} className="modal-container">
        <p onClick={onClose} className="closeBtn">X</p>
        <h2 className="createProjectHeader">Create a New Project</h2>
        <form onSubmit={handleSubmitProject}>
          <label htmlFor="name">PROJECT NAME:</label>
          <input
            type="text"
            id="name"
            value={name}
            placeholder="Enter projects name here..."
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="description">DESCRIPTION:</label>
          <textarea
          placeholder='Enter a short description of your project here...'
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label htmlFor="dueDate">DUE DATE:</label>
          <input
            type="date"
            id="dueDate"
            value={dateDue}
            onChange={(e) => setDateDue(e.target.value)}
          />
          <label htmlFor="projectMembers">PROJECT MEMBERS:</label>
          <Select className='selectBar'
            id="projectMembers"
            defaultValue={`Select Team Members`}
            isMulti
            options={object}
          />
          <button type="submit" className="createBtn" id="createProjBtn">Create Project</button>
        </form>
      </div>
    </div>
  )
}


export default CreateProjectModal

