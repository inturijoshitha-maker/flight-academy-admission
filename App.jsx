import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  // Step tracking - each step must be completed to unlock the next
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);

  // Step definitions
  const steps = [
    "home",
    "about",
    "eligibility",
    "profile",
    "apply",
    "upload",
    "test",
    "status",
    "offer",
    "faq"
  ];

  // Form states
  const [age, setAge] = useState("");
  const [eligibility, setEligibility] = useState("");
  const [isEligible, setIsEligible] = useState(false);

  const [score, setScore] = useState("");
  const [scoreGenerated, setScoreGenerated] = useState(false);

  // Quiz state
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});

  const quizQuestions = [
    {
      id: 1,
      question: "What does 'ATC' stand for in aviation?",
      options: ["Air Traffic Control", "Aircraft Technical Center", "Altitude Tracking Console", "Automatic Throttle Control"],
      answer: "Air Traffic Control"
    },
    {
      id: 2,
      question: "What is the standard cruising altitude for commercial aircraft?",
      options: ["5,000–10,000 ft", "15,000–20,000 ft", "30,000–40,000 ft", "50,000–60,000 ft"],
      answer: "30,000–40,000 ft"
    },
    {
      id: 3,
      question: "What does the 'black box' on an aircraft record?",
      options: ["Passenger data", "Flight data and cockpit voice", "Fuel consumption only", "Weather data"],
      answer: "Flight data and cockpit voice"
    },
    {
      id: 4,
      question: "Which instrument indicates an aircraft's altitude?",
      options: ["Airspeed Indicator", "Altimeter", "Gyroscope", "Turn Coordinator"],
      answer: "Altimeter"
    },
    {
      id: 5,
      question: "What is 'Mayday' used for in aviation?",
      options: ["Routine communication", "Weather reporting", "International distress signal", "Landing request"],
      answer: "International distress signal"
    },
    {
      id: 6,
      question: "What does IFR stand for?",
      options: ["Instrument Flight Rules", "In-Flight Reporting", "International Flying Regulations", "Inflight Radio Frequency"],
      answer: "Instrument Flight Rules"
    },
    {
      id: 7,
      question: "What is the role of a co-pilot?",
      options: ["Manage passengers", "Assist the captain and fly the aircraft", "Control ground crew", "Handle baggage"],
      answer: "Assist the captain and fly the aircraft"
    },
    {
      id: 8,
      question: "Which gas makes up most of the Earth's atmosphere?",
      options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
      answer: "Nitrogen"
    },
    {
      id: 9,
      question: "What does NOTAM stand for?",
      options: ["Notice to Airmen", "National Operating Terminal Airspace Manual", "No Traffic Allowed Movement", "Notice of Terminal Approach Maneuver"],
      answer: "Notice to Airmen"
    },
    {
      id: 10,
      question: "What is the primary purpose of an aircraft's flaps?",
      options: ["Increase speed", "Increase lift and drag during takeoff/landing", "Control yaw", "Reduce fuel consumption"],
      answer: "Increase lift and drag during takeoff/landing"
    }
  ];

  const [status, setStatus] = useState("");
  const [statusChecked, setStatusChecked] = useState(false);

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

  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [applicationData, setApplicationData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    qualification: ""
  });

  const [documentsUploaded, setDocumentsUploaded] = useState({
    photo: false,
    certificates: false,
    idProof: false
  });

  const [applicationId] = useState(`FA2026-${Math.floor(Math.random() * 9000) + 1000}`);

  // Navigation helpers
  const canAccessStep = (stepIndex) => {
    if (stepIndex === 0) return true;
    return completedSteps.includes(steps[stepIndex - 1]);
  };

  const markStepComplete = (stepName) => {
    if (!completedSteps.includes(stepName)) {
      setCompletedSteps([...completedSteps, stepName]);
    }
  };

  const goToStep = (stepIndex) => {
    if (canAccessStep(stepIndex)) {
      setCurrentStep(stepIndex);
    }
  };

  const nextStep = () => {
    markStepComplete(steps[currentStep]);
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Auto-mark step complete as soon as it is visited
  useEffect(() => {
    // Steps that require an action before being marked complete
    const actionSteps = ["eligibility", "profile", "apply", "upload", "test"];
    const stepName = steps[currentStep];
    if (!actionSteps.includes(stepName)) {
      markStepComplete(stepName);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep]);

  // Step-specific functions
  const checkEligibility = () => {
    if (parseInt(age) >= 17) {
      setEligibility("✅ Congratulations! You are Eligible for Admission");
      setIsEligible(true);
    } else {
      setEligibility("❌ Sorry, you must be at least 17 years old to apply");
      setIsEligible(false);
    }
  };

  const handleProfileChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const createProfile = () => {
    if (profile.name && profile.email && profile.phone && profile.age && 
        profile.gender && profile.qualification && profile.course) {
      setProfileCreated(true);
    } else {
      alert("Please fill all fields to create your profile");
    }
  };

  const handleApplicationChange = (e) => {
    setApplicationData({
      ...applicationData,
      [e.target.name]: e.target.value
    });
  };

  const submitApplication = () => {
    if (applicationData.name && applicationData.email && applicationData.phone &&
        applicationData.gender && applicationData.qualification) {
      setApplicationSubmitted(true);
    } else {
      alert("Please fill all fields to submit your application");
    }
  };

  const handleFileUpload = (docType) => {
    setDocumentsUploaded({
      ...documentsUploaded,
      [docType]: true
    });
  };

  const allDocumentsUploaded = () => {
    return documentsUploaded.photo && documentsUploaded.certificates && documentsUploaded.idProof;
  };

  const submitQuiz = () => {
    let correct = 0;
    quizQuestions.forEach(q => {
      if (quizAnswers[q.id] === q.answer) correct++;
    });
    const total = quizQuestions.length;
    const pct = Math.round((correct / total) * 100);
    setScore(`${pct} / 100`);
    setScoreGenerated(true);
    setQuizSubmitted(true);
  };

  const checkStatus = () => {
    const scoreNum = parseInt(score);
    if (scoreGenerated && scoreNum >= 75) {
      setStatus("✅ Application Approved - Proceed to view your Offer Letter!");
    } else if (scoreGenerated) {
      setStatus("🔄 Application Under Review - We'll notify you soon");
    } else {
      setStatus("⚠️ Entrance test not yet completed");
    }
    setStatusChecked(true);
  };

  const getStepStatus = (stepIndex) => {
    if (completedSteps.includes(steps[stepIndex])) return "completed";
    if (stepIndex === currentStep) return "current";
    if (canAccessStep(stepIndex)) return "available";
    return "locked";
  };

  return (
    <div>
      <header>
        <h1>✈️ Flight Academy Admission Portal</h1>
        <p className="tagline">Your Journey to the Skies Begins Here</p>
      </header>

      {/* Progress Navigation */}
      <nav className="step-nav">
        {steps.map((step, index) => (
          <button
            key={step}
            onClick={() => goToStep(index)}
            className={`step-btn ${getStepStatus(index)}`}
            disabled={!canAccessStep(index)}
          >
            <span className="step-number">{index + 1}</span>
            <span className="step-name">{step.charAt(0).toUpperCase() + step.slice(1)}</span>
          </button>
        ))}
      </nav>

      {/* Progress Bar */}
      <div className="progress-container">
        <div 
          className="progress-bar" 
          style={{ width: `${(completedSteps.length / steps.length) * 100}%` }}
        ></div>
        <span className="progress-text">
          {completedSteps.length} of {steps.length} steps completed
        </span>
      </div>

      <section>
        {/* Step 1: Home */}
        {currentStep === 0 && (
          <div className="step-content">
            <h2> Welcome to Flight Academy</h2>
            <div className="welcome-box">
             
              <div className="highlight-box">
                <h3> Admission Process</h3>
                <p>Follow these simple steps to join our academy:</p>
                <ol className="process-list">
                  <li>Check your eligibility</li>
                  <li>Create your student profile</li>
                  <li>Fill the application form</li>
                  <li>Upload required documents</li>
                  <li>Schedule & complete entrance test</li>
                  <li>View your score & track status</li>
                  <li>Receive your offer letter</li>
                </ol>
              </div>
            </div>
            <button className="next-btn" onClick={nextStep}>
              Begin Your Journey →
            </button>
          </div>
        )}

        {/* Step 2: About */}
        {currentStep === 1 && (
          <div className="step-content">
            <h2>About Flight Academy</h2>
            
            <div className="about-grid">
              <div className="about-card">
                <h3>Our Legacy</h3>
                <p>Flight Academy provides world-class aviation training programs for aspiring pilots, cabin crew, and ground staff since 1995.</p>
              </div>
              
              <div className="about-card">
                <h3> Courses Offered</h3>
                <ul>
                  <li><strong>Pilot Training</strong> - 24 months comprehensive program</li>
                  <li><strong>Cabin Crew Training</strong> - 12 months professional course</li>
                  <li><strong>Ground Staff Training</strong> - 6 months certification</li>
                </ul>
              </div>
              
              <div className="about-card">
                <h3> Website Features</h3>
                <ul>
                  <li>Step-by-step guided admission process</li>
                  <li>Real-time eligibility verification</li>
                  <li>Secure document upload system</li>
                  <li>Online entrance test scheduling</li>
                  <li>Instant score generation</li>
                  <li>Live application status tracking</li>
                  <li>Digital offer letter generation</li>
                </ul>
              </div>
              
              <div className="about-card">
                <h3> Why Choose Us?</h3>
                <ul>
                  <li>95% placement rate</li>
                  <li>State-of-the-art simulators</li>
                  <li>Industry-experienced instructors</li>
                  <li>International certifications</li>
                  <li>Partnerships with major airlines</li>
                </ul>
              </div>
            </div>
            
            <button className="next-btn" onClick={nextStep}>
              Check Eligibility →
            </button>
          </div>
        )}

        {/* Step 3: Eligibility */}
        {currentStep === 2 && (
          <div className="step-content">
            <h2> Eligibility Check</h2>
            <div className="form-box">
              <p>Enter your age to verify eligibility for admission</p>
              <input
                type="number"
                placeholder="Enter Your Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                min="1"
                max="100"
              />
              <br /><br />
              <button onClick={checkEligibility} className="action-btn">
                Check Eligibility
              </button>
              {eligibility && (
                <p className={`result ${isEligible ? 'success' : 'error'}`}>
                  {eligibility}
                </p>
              )}
            </div>
            {isEligible && (
              <button className="next-btn" onClick={nextStep}>
                Create Profile →
              </button>
            )}
          </div>
        )}

        {/* Step 4: Profile Creation */}
        {currentStep === 3 && (
          <div className="step-content">
            <h2>👤 Create Student Profile</h2>
            
            {!profileCreated ? (
              <div className="form-box">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name *"
                  value={profile.name}
                  onChange={handleProfileChange}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address *"
                  value={profile.email}
                  onChange={handleProfileChange}
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number *"
                  value={profile.phone}
                  onChange={handleProfileChange}
                />
                <input
                  type="number"
                  name="age"
                  placeholder="Age *"
                  value={profile.age}
                  onChange={handleProfileChange}
                />
                <select name="gender" value={profile.gender} onChange={handleProfileChange}>
                  <option value="">Select Gender *</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                <select name="qualification" value={profile.qualification} onChange={handleProfileChange}>
                  <option value="">Select Qualification *</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Degree">Degree</option>
                  <option value="Post Graduate">Post Graduate</option>
                </select>
                <select name="course" value={profile.course} onChange={handleProfileChange}>
                  <option value="">Select Course *</option>
                  <option value="Pilot Training">Pilot Training</option>
                  <option value="Cabin Crew">Cabin Crew</option>
                  <option value="Ground Staff">Ground Staff</option>
                </select>
                <br />
                <button onClick={createProfile} className="action-btn">
                  Create Profile
                </button>
              </div>
            ) : (
              <div className="profile-card">
                <h3> Profile Created Successfully!</h3>
                <div className="profile-details">
                  <p><strong>Application ID:</strong> {applicationId}</p>
                  <p><strong>Name:</strong> {profile.name}</p>
                  <p><strong>Email:</strong> {profile.email}</p>
                  <p><strong>Phone:</strong> {profile.phone}</p>
                  <p><strong>Age:</strong> {profile.age}</p>
                  <p><strong>Gender:</strong> {profile.gender}</p>
                  <p><strong>Qualification:</strong> {profile.qualification}</p>
                  <p><strong>Course:</strong> {profile.course}</p>
                </div>
                <button className="next-btn" onClick={nextStep}>
                  Fill Application Form →
                </button>
              </div>
            )}
          </div>
        )}

        {/* Step 5: Application Form */}
        {currentStep === 4 && (
          <div className="step-content">
            <h2>Admission Application Form</h2>
            
            {!applicationSubmitted ? (
              <div className="form-box">
                <p>Application ID: <strong>{applicationId}</strong></p>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name *"
                  value={applicationData.name}
                  onChange={handleApplicationChange}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email *"
                  value={applicationData.email}
                  onChange={handleApplicationChange}
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number *"
                  value={applicationData.phone}
                  onChange={handleApplicationChange}
                />
                <select name="gender" value={applicationData.gender} onChange={handleApplicationChange}>
                  <option value="">Select Gender *</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                <select name="qualification" value={applicationData.qualification} onChange={handleApplicationChange}>
                  <option value="">Select Qualification *</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Degree">Degree</option>
                  <option value="Post Graduate">Post Graduate</option>
                </select>
                <br />
                <button onClick={submitApplication} className="action-btn">
                  Submit Application
                </button>
              </div>
            ) : (
              <div className="success-box">
                <h3>✅ Application Submitted Successfully!</h3>
                <p>Your Application ID: <strong>{applicationId}</strong></p>
                <p>Please save this ID for future reference.</p>
                <button className="next-btn" onClick={nextStep}>
                  Upload Documents →
                </button>
              </div>
            )}
          </div>
        )}

        {/* Step 6: Document Upload */}
        {currentStep === 5 && (
          <div className="step-content">
            <h2>Document Upload</h2>
            <div className="upload-box">
              <div className={`upload-item ${documentsUploaded.photo ? 'uploaded' : ''}`}>
                <p>📷 Passport Size Photo</p>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={() => handleFileUpload('photo')}
                />
                {documentsUploaded.photo && <span className="check">✅ Uploaded</span>}
              </div>
              
              <div className={`upload-item ${documentsUploaded.certificates ? 'uploaded' : ''}`}>
                <p> Educational Certificates</p>
                <input 
                  type="file" 
                  accept=".pdf,.jpg,.png"
                  onChange={() => handleFileUpload('certificates')}
                />
                {documentsUploaded.certificates && <span className="check">✅ Uploaded</span>}
              </div>
              
              <div className={`upload-item ${documentsUploaded.idProof ? 'uploaded' : ''}`}>
                <p> ID Proof (Aadhar/Passport)</p>
                <input 
                  type="file" 
                  accept=".pdf,.jpg,.png"
                  onChange={() => handleFileUpload('idProof')}
                />
                {documentsUploaded.idProof && <span className="check">✅ Uploaded</span>}
              </div>
            </div>
            
            {allDocumentsUploaded() && (
              <button className="next-btn" onClick={nextStep}>
                Attempt Entrance Test →
              </button>
            )}
          </div>
        )}

        {/* Step 7: Quiz + Score Display */}
        {currentStep === 6 && (
          <div className="step-content">
            <h2>✈️ Entrance Test</h2>

            {!quizStarted && !quizSubmitted && (
              <div className="form-box" style={{textAlign:'center'}}>
                <p style={{fontSize:'15px'}}>You are about to attempt the Flight Academy Entrance Test.</p>
                <div style={{background:'#e3f2fd', borderRadius:'10px', padding:'15px', margin:'15px 0', textAlign:'left'}}>
                  <p style={{margin:'5px 0'}}>📝 <strong>Total Questions:</strong> 10</p>
                  <p style={{margin:'5px 0'}}>🏆 <strong>Total Marks:</strong> 100 (10 marks per question)</p>
                  <p style={{margin:'5px 0'}}>✅ <strong>Pass Mark:</strong> 75 / 100</p>
                </div>
                <button className="action-btn" onClick={() => setQuizStarted(true)}>
                  Start Quiz ✏️
                </button>
              </div>
            )}

            {quizStarted && !quizSubmitted && (
              <div style={{maxWidth:'650px', margin:'0 auto'}}>
                <div style={{background:'#e3f2fd', borderRadius:'8px', padding:'10px 20px', marginBottom:'20px', display:'flex', justifyContent:'flex-end', alignItems:'center'}}>
                  <span>Answered: <strong>{Object.keys(quizAnswers).length} / {quizQuestions.length}</strong></span>
                </div>

                {quizQuestions.map((q, idx) => (
                  <div key={q.id} style={{background:'white', borderRadius:'12px', padding:'20px', marginBottom:'16px', boxShadow:'0 2px 10px rgba(0,0,0,0.08)', textAlign:'left'}}>
                    <p style={{fontWeight:'600', color:'#0077cc', marginTop:0}}>Q{idx + 1}. {q.question}</p>
                    <div style={{display:'flex', flexDirection:'column', gap:'8px'}}>
                      {q.options.map(opt => (
                        <label key={opt} style={{
                          display:'flex', alignItems:'center', gap:'10px', padding:'10px 14px',
                          borderRadius:'8px', border:`2px solid ${quizAnswers[q.id] === opt ? '#0077cc' : '#ddd'}`,
                          background: quizAnswers[q.id] === opt ? '#e3f2fd' : '#fafafa',
                          cursor:'pointer', transition:'all 0.2s', fontWeight: quizAnswers[q.id] === opt ? '600' : '400'
                        }}>
                          <input
                            type="radio"
                            name={`q${q.id}`}
                            value={opt}
                            checked={quizAnswers[q.id] === opt}
                            onChange={() => setQuizAnswers({...quizAnswers, [q.id]: opt})}
                            style={{width:'auto', margin:0}}
                          />
                          {opt}
                        </label>
                      ))}
                    </div>
                  </div>
                ))}

                <div style={{textAlign:'center', marginTop:'10px'}}>
                  {Object.keys(quizAnswers).length < quizQuestions.length && (
                    <p style={{color:'#e67e22', fontSize:'14px'}}>⚠️ Please answer all {quizQuestions.length} questions before submitting.</p>
                  )}
                  <button
                    className="next-btn"
                    onClick={submitQuiz}
                    disabled={Object.keys(quizAnswers).length < quizQuestions.length}
                    style={{opacity: Object.keys(quizAnswers).length < quizQuestions.length ? 0.5 : 1, cursor: Object.keys(quizAnswers).length < quizQuestions.length ? 'not-allowed' : 'pointer'}}
                  >
                    Submit Quiz & View Score →
                  </button>
                </div>
              </div>
            )}

            {quizSubmitted && (
              <div className="score-box" style={{textAlign:'center'}}>
                <h3>🎉 Quiz Submitted!</h3>
                <div className="score-display" style={{margin:'20px auto', maxWidth:'300px'}}>
                  <p style={{color:'rgba(255,255,255,0.8)', margin:'0 0 5px', fontSize:'14px'}}>Your Score</p>
                  <span className="score-value">{score}</span>
                  <p style={{color:'rgba(255,255,255,0.8)', margin:'8px 0 0', fontSize:'13px'}}>
                    {(() => { const c = quizQuestions.filter(q => quizAnswers[q.id] === q.answer).length; return `${c} correct out of ${quizQuestions.length} questions`; })()}
                  </p>
                </div>

                {/* Answer Review */}
                <div style={{maxWidth:'650px', margin:'20px auto', textAlign:'left'}}>
                  <h4 style={{color:'#0077cc'}}>📋 Answer Review</h4>
                  {quizQuestions.map((q, idx) => {
                    const isCorrect = quizAnswers[q.id] === q.answer;
                    return (
                      <div key={q.id} style={{background:'white', borderRadius:'10px', padding:'15px', marginBottom:'12px', boxShadow:'0 2px 8px rgba(0,0,0,0.07)', borderLeft:`4px solid ${isCorrect ? '#28a745' : '#dc3545'}`}}>
                        <p style={{fontWeight:'600', margin:'0 0 6px', color:'#333'}}>Q{idx+1}. {q.question}</p>
                        <p style={{margin:'3px 0', fontSize:'14px'}}>
                          Your answer: <span style={{color: isCorrect ? '#28a745' : '#dc3545', fontWeight:'600'}}>{quizAnswers[q.id] || 'Not answered'} {isCorrect ? '✅' : '❌'}</span>
                        </p>
                        {!isCorrect && (
                          <p style={{margin:'3px 0', fontSize:'14px', color:'#28a745'}}>
                            Correct answer: <strong>{q.answer}</strong>
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>

                <p style={{color:'#666', fontSize:'14px'}}>Minimum passing score: 75 / 100</p>
                {parseInt(score) >= 75 ? (
                  <p className="result success">✅ Congratulations! You passed the entrance test!</p>
                ) : (
                  <p className="result error">❌ Your score is below the passing mark. It will be reviewed by our team.</p>
                )}
                <button className="next-btn" onClick={nextStep}>
                  Track Application Status →
                </button>
              </div>
            )}
          </div>
        )}

        {/* Step 8: Status Tracker */}
        {currentStep === 7 && (
          <div className="step-content">
            <h2>📍 Application Status</h2>
            
            <div className="form-box">
              <p>Application ID: <strong>{applicationId}</strong></p>
              
              {!statusChecked ? (
                <>
                  <button onClick={checkStatus} className="action-btn">
                    Check Status
                  </button>
                </>
              ) : (
                <div className="status-box">
                  <h3>{status}</h3>
                  <div className="timeline">
                    <div className="timeline-item completed">
                      <span className="dot"></span>
                      <span>Application Submitted</span>
                    </div>
                    <div className="timeline-item completed">
                      <span className="dot"></span>
                      <span>Documents Verified</span>
                    </div>
                    <div className="timeline-item completed">
                      <span className="dot"></span>
                      <span>Entrance Test Completed</span>
                    </div>
                    <div className={`timeline-item ${parseInt(score) >= 75 ? 'completed' : 'pending'}`}>
                      <span className="dot"></span>
                      <span>Final Review</span>
                    </div>
                  </div>
                  <button className="next-btn" onClick={nextStep}>
                    {parseInt(score) >= 75 ? 'View Offer Letter →' : 'Continue →'}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 9: Offer Letter */}
        {currentStep === 8 && (
          <div className="step-content">
            <h2>🎓 Offer Letter</h2>
            
            <div className="offer-box">
              <div className="offer-header">
                <h3>✈️ Flight Academy</h3>
                <p>Official Admission Offer</p>
              </div>
              
              <div className="offer-content">
                <p>Date: {new Date().toLocaleDateString()}</p>
                <p>Application ID: <strong>{applicationId}</strong></p>
                
                <br />
                
                <p>Dear <strong>{profile.name || "Candidate"}</strong>,</p>
                
                <p>
                  We are pleased to inform you that you have been <strong>selected</strong> for 
                  the <strong>{profile.course || "Aviation Training"}</strong> program at Flight Academy 
                  for the academic year 2026-27.
                </p>
                
                <p><strong>Program Details:</strong></p>
                <ul>
                  <li>Course: {profile.course || "Aviation Training"}</li>
                  <li>Duration: 12-24 months</li>
                  <li>Start Date: 01-August-2026</li>
                  <li>Reporting Time: 9:00 AM</li>
                </ul>
                
                <p>
                  Please report to the Flight Academy Main Campus with all original documents 
                  on the mentioned date.
                </p>
                
                <br />
                
                <p>Congratulations and welcome to Flight Academy!</p>
                
                <p className="signature">
                  <strong>Flight Academy Admissions Team</strong><br />
                  admissions@flightacademy.edu
                </p>
              </div>
              
              <button className="print-btn" onClick={() => window.print()}>
                 Print Offer Letter
              </button>
            </div>
            
            <button className="next-btn" onClick={nextStep}>
              View FAQ →
            </button>
          </div>
        )}

        {/* Step 10: FAQ */}
        {currentStep === 9 && (
          <div className="step-content">
            <h2>❓ Frequently Asked Questions</h2>
            
            <div className="faq-container">
              <div className="faq-item">
                <h4>What is the minimum age requirement?</h4>
                <p>You must be at least 17 years old to apply for any course.</p>
              </div>
              
              <div className="faq-item">
                <h4>What qualifications are required?</h4>
                <p>Minimum Intermediate (10+2) or equivalent. Degree holders are preferred for Pilot Training.</p>
              </div>
              
              <div className="faq-item">
                <h4>What is the course duration?</h4>
                <p>
                  • Pilot Training: 24 months<br />
                  • Cabin Crew: 12 months<br />
                  • Ground Staff: 6 months
                </p>
              </div>
              
              <div className="faq-item">
                <h4>What is the fee structure?</h4>
                <p>Fee varies by course. Contact admissions for detailed fee structure and payment plans.</p>
              </div>
              
              <div className="faq-item">
                <h4>Is there a placement guarantee?</h4>
                <p>We have a 95% placement rate with partner airlines including major domestic and international carriers.</p>
              </div>
              
              <div className="faq-item">
                <h4>Can I reschedule my entrance test?</h4>
                <p>Yes, you can reschedule once by contacting the admissions office at least 48 hours before your scheduled test.</p>
              </div>
            </div>
            
            <div className="completion-box">
              <h3>🎉 Congratulations!</h3>
              <p>You have completed the entire admission process!</p>
              <p>Your Application ID: <strong>{applicationId}</strong></p>
              <button onClick={() => {
                markStepComplete(steps[currentStep]);
                setCurrentStep(0);
              }}>
                Return to Home
              </button>
            </div>
          </div>
        )}
      </section>

     
    </div>
  );
}

export default App;
