



export default function Login () {
    return (
        <div>
            <button>Login W/ Google</button>
            <div className="login-Form" onSubmit={handleSubmit}>
                <form>
                    <label htmlFor="username">Username: </label>
                    <input type="text" placeholder="UserName" id="userName" onChange={handleChange} value={formState.userName}/>
                    <label htmlFor="password">Password: </label>
                    <input type="password" id="password" onChange={handleChange} value={formState.password} />
                    <p className="invalid" style={{display: isActive? "": "none"}}>Password or Username incorrect</p>
                    <button type="submit">Submit</button>
                </form>       
            </div>
            <p><span className="create">Create Account</span> here</p>
        </div>

    )
}