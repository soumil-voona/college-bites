import React from 'react'
import "./information.css"
import MenuBar from './MenuBar'


const Information = () => {
  return (
    <>
    <div className="info-opening">
        
        <MenuBar />
        <h2 className="header">Share homemade love <br /> <span style={{ color: '#510104' }}>To your college doves</span></h2>
        <div className = 'btn customer'><span className = 'txt'>I am a customer</span></div>
        <div className = 'btn driver'><span className = 'txt'>I am a driver</span></div>
    </div>
    <div className="second">
        <h2 className = 'header about'>About <span style = {{color: '#E0BABB'}}>us</span></h2>
        <div className = 'help'>
        <h3>
            Helping College Students
        </h3>
        <p>
            A common challenge faced by parents of college students is the desire to send homemade food to their children without having to make the trip themselves. Our website aims to address this issue by leveraging community-based carpooling methods to facilitate the delivery of homemade meals. Through our platform, parents can connect with trusted community members who are already traveling to college towns, ensuring that food reaches students efficiently and safely.
        </p>
        </div>
    </div>
    <div className="third">
        <h2 className = 'header about'>How it <span style = {{color: '#E0BABB'}}>works</span></h2>
        <div className = 'deliver'>
            <h3>
                Deliver Food
            </h3>
            <p>
            Transport homemade meals from the community to college students and earn compensation for your service.
            </p>
        </div>
        <div className = 'foodDelivered'>
            <h3>
                Get Food Delivered
            </h3>
            <p>
                Hand off homemade meals to a designated driver and have them delivered safely to your college student.
            </p>
        </div>
    </div>
    <div className="fourth">
        <h2 className = 'header about'>Box <span style = {{color: '#E0BABB'}}>Information</span></h2>
        <div className = 'measurements'>
            <h3>
                Food Measurements
            </h3>
            <p>
                <img src = './images/boxSize.png' alt='dimensions' style={{width: '30vw', marginTop: '-8vh'}}></img>
            </p>
        </div>
        <div className = 'foodDelivered'>
            <h3>
                Food Capacity:
            </h3>
            <p>
                coupe: 10-15 boxes <br /><br />
                sedan: 20-24 boxes <br /><br />
                SUVs and minivans: 75-100 boxes
            </p>
        </div>
    </div>
    </>
  )
}

export default Information