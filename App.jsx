 import React, { useState } from "react";
import "./App.css";

function App() {
  const [page, setPage] = useState("home");
  const [age, setAge] = useState("");
  const [eligibility, setEligibility] = useState("");
  const [score, setScore] = useState("");
  const [status, setStatus] = useState("");

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    qualification: "",
    course: ""
  });

  const [profileCreated, setProfileCreated] = useState(false);

  const checkEligibility = () => {
    if (age >= 17) {
      setEligibility("Eligible for Admission");
    } else {
      setEligibility("Not Eligible");
    }
  };

  const showScore = () => {
    setScore("85 / 100");
  };

  const showStatus = () => {
    setStatus("Application Under Review");
  };

  const handleProfileChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const createProfile = () => {
    setProfileCreated(true);
  };

  return (
    <div>
      <header>
        <h1>✈ Flight Academy Admission Portal</h1>
      </header>

      <nav>
        <button onClick={() => setPage("home")}>Home</button>
        <button onClick={() => setPage("about")}>About</button>
        <button onClick={() => setPage("eligibility")}>Eligibility</button>
        <button onClick={() => setPage("apply")}>Apply</button>
        <button onClick={() => setPage("upload")}>Upload</button>
        <button onClick={() => setPage("test")}>Test</button>
        <button onClick={() => setPage("status")}>Status</button>
        <button onClick={() => setPage("profile")}>Profile</button>
        <button onClick={() => setPage("offer")}>Offer Letter</button>
        <button onClick={() => setPage("email")}>Email</button>
        <button onClick={() => setPage("faq")}>FAQ</button>
      </nav>

      <section>

        {page === "home" && (
          <>
            <h2>Welcome to Flight Academy</h2>
            <p>
              Start your aviation career with world-class training and
              professional guidance.
            </p>
          </>
        )}

        {page === "about" && (
          <>
            <h2>About Academy</h2>

            <p>
              Flight Academy provides aviation training programs for
              aspiring pilots, cabin crew, and ground staff.
            </p>

            <h3>Courses Offered</h3>

            <ul>
              <li>Pilot Training</li>
              <li>Cabin Crew Training</li>
              <li>Ground Staff Training</li>
            </ul>
          </>
        )}

        {page === "eligibility" && (
          <>
            <h2>Eligibility Check</h2>

            <input
              type="number"
              placeholder="Enter Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />

            <br /><br />

            <button onClick={checkEligibility}>
              Check Eligibility
            </button>

            <p>{eligibility}</p>
          </>
        )}

        {page === "apply" && (
          <>
            <h2>Admission Form</h2>

            <input type="text" placeholder="Full Name" />
            <br />

            <input type="email" placeholder="Email" />
            <br />

            <input type="text" placeholder="Phone Number" />
            <br />

            <select>
              <option>Male</option>
              <option>Female</option>
            </select>

            <br />

            <select>
              <option>Intermediate</option>
              <option>Degree</option>
            </select>

            <br /><br />

            <button>Submit Application</button>
          </>
        )}

        {page === "upload" && (
          <>
            <h2>Document Upload</h2>

            <p>Upload Passport Size Photo</p>
            <input type="file" />

            <p>Upload Certificates</p>
            <input type="file" />

            <p>Upload ID Proof</p>
            <input type="file" />
          </>
        )}

        {page === "test" && (
          <>
            <h2>Test Scheduler</h2>

            <input type="date" />

            <br /><br />

            <button onClick={showScore}>
              Schedule Test & View Score
            </button>

            <p>Entrance Test Scheduled Successfully</p>

            <h3>{score}</h3>
          </>
        )}

        {page === "status" && (
          <>
            <h2>Status Tracker</h2>

            <input
              type="text"
              placeholder="Enter Application ID"
            />

            <br /><br />

            <button onClick={showStatus}>
              Track Status
            </button>

            <p>{status}</p>
          </>
        )}

        {page === "profile" && (
          <>
            <h2>Create Student Profile</h2>

            {!profileCreated ? (
              <>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  onChange={handleProfileChange}
                />
                <br />

                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleProfileChange}
                />
                <br />

                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  onChange={handleProfileChange}
                />
                <br />

                <input
                  type="number"
                  name="age"
                  placeholder="Age"
                  onChange={handleProfileChange}
                />
                <br />

                <select
                  name="gender"
                  onChange={handleProfileChange}
                >
                  <option value="">Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>

                <br />

                <select
                  name="qualification"
                  onChange={handleProfileChange}
                >
                  <option value="">Qualification</option>
                  <option>Intermediate</option>
                  <option>Degree</option>
                </select>

                <br />

                <select
                  name="course"
                  onChange={handleProfileChange}
                >
                  <option value="">Select Course</option>
                  <option>Pilot Training</option>
                  <option>Cabin Crew</option>
                  <option>Ground Staff</option>
                </select>

                <br /><br />

                <button onClick={createProfile}>
                  Create Profile
                </button>
              </>
            ) : (
              <>
                <h3>Profile Created Successfully</h3>

                <p><b>Name:</b> {profile.name}</p>
                <p><b>Email:</b> {profile.email}</p>
                <p><b>Phone:</b> {profile.phone}</p>
                <p><b>Age:</b> {profile.age}</p>
                <p><b>Gender:</b> {profile.gender}</p>
                <p><b>Qualification:</b> {profile.qualification}</p>
                <p><b>Course:</b> {profile.course}</p>

                <p>
                  <b>Application ID:</b> FA2026-
                  {Math.floor(Math.random() * 1000)}
                </p>
              </>
            )}
          </>
        )}

        {page === "offer" && (
          <>
            <h2>Offer Letter</h2>

            <div className="offer-box">
              <h3>Flight Academy Admission Offer</h3>

              <p>
                Congratulations! You have been selected
                for the Pilot Training Program.
              </p>

              <p>Reporting Date: 01-Aug-2026</p>

              <p>Flight Academy Admissions Team</p>
            </div>
          </>
        )}

        {page === "email" && (
          <>
            <h2>Email Notification</h2>

            <input
              type="email"
              placeholder="Enter Email"
            />

            <br /><br />

            <button>
              Send Notification
            </button>
          </>
        )}

        {page === "faq" && (
          <>
            <h2>Frequently Asked Questions</h2>

            <p><b>Minimum Age?</b></p>
            <p>17 Years</p>

            <p><b>Qualification?</b></p>
            <p>Intermediate or Degree</p>

            <p><b>Course Duration?</b></p>
            <p>12 - 24 Months</p>
          </>
        )}

      </section>
    </div>
  );
}

export default App;