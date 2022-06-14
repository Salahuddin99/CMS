import React from 'react'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import DiscoverProjects from './screens/DiscoverProjects'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ProjectScreen from './screens/ProjectScreen'
import { SignInScreen } from './screens/SignInScreen'
import { RegisterScreen } from './screens/RegisterScreen'
import { ProfileScreen } from './screens/ProfileScreen'
import AdminDashboard from './screens/AdminDashboard'
import ProjectEditScreen from './screens/ProjectEditScreen'
import ProjectCreateScreen from './screens/ProjectCreateScreen'
import UpdateUserScreen from './screens/UpdateUserScreen'
import StartAProjectScreen from './screens/StartAProjectScreen'
import ProjectListScreen from './screens/ProjectListScreen'
import PaymentDescriptionScreen from './screens/PaymentDescriptionScreen'
import PaymentScreen from './screens/paymentScreen'
import PaymentDescriptionProject from './screens/PaymentDescriptionProject'
import DonationPayScreen from './screens/DonationPayScreen'
import DonationHistory from './screens/DonationHistory'
import DonationHistoryAdmin from './screens/DonationHistoryAdmin'
import AboutUsScreen from './screens/AboutUsScreen'

function App() {
  return (
    <>
      <Router>
        <Header />
        <main className="py-3">
          <Container>
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route
                path="/payment_project/:id"
                element={<PaymentDescriptionProject />}
              />
              <Route
                path="/payment_description"
                element={<PaymentDescriptionScreen />}
              />
              <Route path="/payment_confirm" element={<PaymentScreen />} />
              <Route path="/donate/:id" element={<DonationPayScreen />} />
              <Route path="/donation/history" element={<DonationHistory />} />
              <Route
                path="/project/history"
                element={<DonationHistoryAdmin />}
              />

              <Route path="/project/:id" element={<ProjectScreen />} exact />
              <Route path="/project/:id/edit" element={<ProjectEditScreen />} />
              <Route path="/project/create" element={<ProjectCreateScreen />} />

              <Route path="/Project" element={<DiscoverProjects />} />
              <Route path="/signin" element={<SignInScreen />} />
              <Route path="/register" element={<RegisterScreen />} />
              <Route path="/profile" element={<ProfileScreen />} />
              <Route path="/adminDashboard" element={<AdminDashboard />} />
              <Route path="/About-us" element={<AboutUsScreen />} />
              <Route
                path="/user/:id/updateStatus"
                element={<UpdateUserScreen />}
              />
              <Route
                path="/start-a-project"
                element={<StartAProjectScreen />}
              />
              <Route path="/projectlist/Ngo" element={<ProjectListScreen />} />
            </Routes>
          </Container>
        </main>
        <Footer />
      </Router>
    </>
  )
}

export default App
