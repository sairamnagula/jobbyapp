import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    isLoading: false,
  }

  componentDidMount() {
    this.setState({isLoading: true})
  }

  renderProfileDetails = data => {
    const {name, profileImageUrl, shortBio} = data
    return (
      <div className="label-type">
        <h1>{name}</h1>
        <img src={profileImageUrl} alt="profile" />
        <p>{shortBio}</p>
      </div>
    )
  }

  profileSection = async () => {
    const apiUrl = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    console.log(response)

    if (response.ok === true) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const updatedData = {
        name: fetchedData.name,
        profileImageUrl: fetchedData.profile_image_url,
        shortBio: fetchedData.short_bio,
      }
      this.renderProfileDetails(updatedData)
    }
  }

  render() {
    const {isLoading} = this.state
    return (
      <div>
        <Header />
        <div className="bg-jobs-container">
          <div>
            {isLoading ? (
              this.profileSection()
            ) : (
              <Loader type="TailSpin" color="white" height={50} width={50} />
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
