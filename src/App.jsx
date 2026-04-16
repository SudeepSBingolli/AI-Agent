import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// Single Rescue-Net assistant agent
const agents = [
  {
    id: 1,
    name: "Rescue-Net Agent",
    position: [-4.5, -0.5, 1.5], // Shifted the agent dramatically to the left and slightly forward
    color: '#3498db',
    message: "I am Rescue-Net. Tell me the situation and I will coordinate emergency help immediately.",
    actions: ["Call Ambulance", "Notify Hospital"],
    follow_up: "What happened, and are you safe right now?"
  },
];

const Stickman = ({ color }) => {
  return (
    <group position={[0, -0.5, 0]}>
      {/* Head */}
      <mesh position={[0, 1.8, 0]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} />
      </mesh>
      {/* Torso */}
      <mesh position={[0, 0.7, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 1.6, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.1} />
      </mesh>
      {/* Arms Setup (Waving) */}
      <mesh position={[-0.4, 1.2, 0]} rotation={[0, 0, Math.PI / 4]}>
        <cylinderGeometry args={[0.06, 0.06, 1.2, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0.4, 1.2, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <cylinderGeometry args={[0.06, 0.06, 1.2, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* Legs */}
      <mesh position={[-0.22, -0.65, 0]} rotation={[0, 0, -Math.PI / 8]}>
        <cylinderGeometry args={[0.08, 0.08, 1.3, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0.22, -0.65, 0]} rotation={[0, 0, Math.PI / 8]}>
        <cylinderGeometry args={[0.08, 0.08, 1.3, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
};

function Agent({ id, position, color, message, onClick }) {
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [dropped, setDropped] = useState(false);
  
  const [target, setTarget] = useState(new THREE.Vector3(...position));
  const [currentPos, setCurrentPos] = useState(new THREE.Vector3(position[0], 10, position[2]));

  // Drop animation on mount & continuous wandering/floating
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    if (!dropped) {
      // initial drop
      currentPos.lerp(new THREE.Vector3(...position), delta * 4);
      groupRef.current.position.copy(currentPos);
      if (currentPos.distanceTo(new THREE.Vector3(...position)) < 0.1) {
        setDropped(true);
      }
      return;
    }

    // Wander towards target smoothly
    currentPos.lerp(target, delta);
    groupRef.current.position.copy(currentPos);
    
    // Add floating bob effect
    groupRef.current.position.y += Math.sin(state.clock.elapsedTime * 3 + id) * 0.03;

    // Periodically pick new random target for wandering
    if (currentPos.distanceTo(target) < 0.2) {
      if (Math.random() > 0.98) {
        setTarget(new THREE.Vector3(
          position[0] + (Math.random() - 0.5) * 5,
          position[1], // base height
          position[2] + (Math.random() - 0.5) * 5
        ));
      }
    }
  });

  return (
    <group
      ref={groupRef}
      position={[position[0], 10, position[2]]}
      onClick={onClick}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
      onPointerOut={(e) => { e.stopPropagation(); setHovered(false); }}
      scale={hovered ? 1.4 : 1.2}
    >
      <Stickman color={color} />
    </group>
  );
}

export default function App() {
  const [activeSession, setActiveSession] = useState(null);
  const [inputText, setInputText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(0);
  const [language, setLanguage] = useState('en');
  const closeTimeoutRef = useRef(null);
  const chatHistoryRef = useRef(null);

  const tutorialContent = [
    { title: "Welcome to Rescue-Net", text: "Welcome to the Phase 3 Emergency System. Let me guide you on how to test this AI Agent." },
    { title: "1. Call The Agent", text: "See the floating stickman on the left? Click on him to activate the secure emergency console." },
    { title: "2. Hands-Free Voice", text: "Inside the console, tap the 🎤 Mic to speak your emergency naturally without typing." },
    { title: "3. Action Engine", text: "Try typing 'There is an accident'. The AI will instantly coordinate the Ambulance, Hospital, and Finance systems for you automatically!" }
  ];

  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [activeSession?.history]);

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.pitch = 1;
      utterance.rate = 1;
      utterance.lang = language === 'hi' ? 'hi-IN' : language === 'kn' ? 'kn-IN' : 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleAgentClick = (agent) => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    
    const initialMessage = agent.message + " " + agent.follow_up;
    speak(initialMessage);
    
    // Start a new isolated session for the clicked agent
    setActiveSession({
      agent: agent,
      history: [{ sender: 'agent', text: initialMessage }]
    });

    closeTimeoutRef.current = setTimeout(() => {
      setActiveSession(null);
    }, 15000); // Close automatically after 15 seconds if no interaction
  };

  const processUserInput = (userText) => {
    if (!userText.trim() || !activeSession) return;
    
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);

    setInputText("");
    
    // Immediately show the user's message
    setActiveSession(prev => ({
      ...prev,
      history: [...prev.history, { sender: 'user', text: userText }]
    }));

    const lowerInput = userText.toLowerCase();

    // Central Coordinator Agent Logic (Simulating Phase 3 Workflow)
    const sequences = {
      accident: {
        en: [
          { text: "⚡ [SYSTEM]: Triangulating live GPS coordinates... 98% precision achieved.", delay: 300, type: 'action' },
          { text: "🚑 [EMERGENCY AGENT]: Nearest Critical Care Unit located. Ambulance dispatched from City Hospital.", delay: 1200, type: 'action' },
          { text: "🔒 [COORDINATOR]: Securing traffic lights for clear passage.", delay: 2000, type: 'action' },
          { text: "I have you on my radar. An ambulance is rushing to your exact location, arriving in precisely 4 minutes. Do you see anyone with severe bleeding?", delay: 3200, type: 'response' }
        ],
        hi: [
          { text: "⚡ [सिस्टम]: लाइव जीपीएस स्थान ट्रैक किया जा रहा है... 98% सटीकता।", delay: 300, type: 'action' },
          { text: "🚑 [इमरजेंसी एजेंट]: एम्बुलेंस सिटी अस्पताल से निकल चुकी है।", delay: 1200, type: 'action' },
          { text: "🔒 [कोऑर्डिनेटर]: एम्बुलेंस के लिए ट्रैफिक सिग्नल साफ़ किए जा रहे हैं।", delay: 2000, type: 'action' },
          { text: "आपकी लोकेशन मिल गई है। एक एम्बुलेंस ठीक 4 मिनट में आपकी लोकेशन पर पहुँच रही है। क्या किसी को गंभीर चोट है?", delay: 3200, type: 'response' }
        ],
        kn: [
          { text: "⚡ [ಸಿಸ್ಟಮ್]: ಲೈವ್ ಜಿಪಿಎಸ್ ಟ್ರ್ಯಾಕ್ ಮಾಡಲಾಗುತ್ತಿದೆ... 98% ನಿಖರತೆ.", delay: 300, type: 'action' },
          { text: "🚑 [ತುರ್ತು ಏಜೆಂಟ್]: ಹತ್ತಿರದ ಆಸ್ಪತ್ರೆಯಿಂದ ಆಂಬ್ಯುಲೆನ್ಸ್ ಕಳುಹಿಸಲಾಗಿದೆ.", delay: 1200, type: 'action' },
          { text: "🔒 [ಸಂಯೋಜಕ]: ಸಂಚಾರ ದೀಪಗಳನ್ನು ತೆರವುಗೊಳಿಸಲಾಗುತ್ತಿದೆ.", delay: 2000, type: 'action' },
          { text: "ನಿಮ್ಮ ಸ್ಥಳವನ್ನು ಪತ್ತೆಹಚ್ಚಲಾಗಿದೆ. ಆಂಬ್ಯುಲೆನ್ಸ್ 4 ನಿಮಿಷದಲ್ಲಿ ಬರಲಿದೆ. ಯಾರಿಗಾದರೂ ದಟ್ಟವಾದ ರಕ್ತಸ್ರಾವವಾಗುತ್ತಿದೆಯೇ?", delay: 3200, type: 'response' }
        ]
      },
      identity: {
        en: [
          { text: "👁️ [IDENTITY AGENT]: Activating facial biometrics... Comparing against national registry.", delay: 300, type: 'action' },
          { text: "✅ [IDENTITY AGENT]: Patient Match: Alex Mercer. Blood Group: AB Negative.", delay: 1500, type: 'action' },
          { text: "🏥 [HOSPITAL AGENT]: Alerting blood bank for immediate AB- reserve prep.", delay: 2400, type: 'action' },
          { text: "Identity confirmed. I've sent Alex's critical medical profile to the paramedics, and the hospital is prepping the trauma bay.", delay: 3500, type: 'response' }
        ],
        hi: [
          { text: "👁️ [पहचान एजेंट]: फेशियल बायोमेट्रिक्स स्कैन चालू... राष्ट्रीय डेटाबेस से मिलान।", delay: 300, type: 'action' },
          { text: "✅ [पहचान एजेंट]: मरीज का मिलान: एलेक्स मर्सर। ब्लड ग्रुप: AB-", delay: 1500, type: 'action' },
          { text: "🏥 [अस्पताल एजेंट]: ब्लड बैंक को AB- ब्लड रिज़र्व के लिए अलर्ट किया जा रहा है।", delay: 2400, type: 'action' },
          { text: "पहचान पक्की हो गई। मैंने मरीज का मेडिकल रिकॉर्ड पैरामेडिक्स को भेज दिया है।", delay: 3500, type: 'response' }
        ],
        kn: [
          { text: "👁️ [ಗುರುತು ಏಜೆಂಟ್]: ಮುಖದ ಭೌತಿಕ ಸ್ಕ್ಯಾನ್... ರಾಷ್ಟ್ರೀಯ ಡೇಟಾಬೇಸ್ ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ.", delay: 300, type: 'action' },
          { text: "✅ [ಗುರುತು ಏಜೆಂಟ್]: ರೋಗಿಯ ಗುರುತು ಸಿಕ್ಕಿದೆ. ಹೆಸರು: ಅಲೆಕ್ಸ್. ರಕ್ತದ ಗುಂಪು: AB-", delay: 1500, type: 'action' },
          { text: "🏥 [ಆಸ್ಪತ್ರೆ ಏಜೆಂಟ್]: ರಕ್ತ ಬ್ಯಾಂಕ್‌ಗೆ ಎಚ್ಚರಿಕೆ ನೀಡಲಾಗುತ್ತಿದೆ.", delay: 2400, type: 'action' },
          { text: "ರೋಗಿಯನ್ನು ಗುರುತಿಸಲಾಗಿದೆ. ಅವರ ವೈದ್ಯಕೀಯ ಇತಿಹಾಸವನ್ನು ಆಸ್ಪತ್ರೆಗೆ ಕಳುಹಿಸಲಾಗಿದೆ. ಶಾಂತವಾಗಿರಿ.", delay: 3500, type: 'response' }
        ]
      },
      finance: {
        en: [
          { text: "💼 [FINANCE AGENT]: Interfacing with Universal Health DB for active policies...", delay: 300, type: 'action' },
          { text: "✅ [FINANCE AGENT]: HealthShield Pro verified. Zero-cost emergency tier active.", delay: 1500, type: 'action' },
          { text: "We have fully verified the insurance. You are covered completely, so please don't worry about payments right now.", delay: 2600, type: 'response' }
        ],
        hi: [
          { text: "💼 [वित्तीय एजेंट]: सक्रिय बीमा नीतियों की जांच की जा रही है...", delay: 300, type: 'action' },
          { text: "✅ [वित्तीय एजेंट]: HealthShield Pro सत्यापित। शून्य-लागत आपातकालीन सुविधा सक्रिय।", delay: 1500, type: 'action' },
          { text: "आपका बीमा पूरी तरह से सत्यापित हो गया है। आपको भुगतान की कोई चिंता करने की जरुरत नहीं है।", delay: 2600, type: 'response' }
        ],
        kn: [
          { text: "💼 [ಹಣಕಾಸು ಏಜೆಂಟ್]: ವಿಮಾ ಪಾಲಿಸಿಯನ್ನು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...", delay: 300, type: 'action' },
          { text: "✅ [ಹಣಕಾಸು ಏಜೆಂಟ್]: ವಿಮೆ ಸಕ್ರಿಯವಾಗಿದೆ. ಯಾವುದೇ ಆರಂಭಿಕ ವೆಚ್ಚವಿಲ್ಲ.", delay: 1500, type: 'action' },
          { text: "ನಿಮ್ಮ ವಿಮೆಯನ್ನು ಪರಿಶೀಲಿಸಲಾಗಿದೆ. ದಯವಿಟ್ಟು ನೀವು ಪಾವತಿಯ ಬಗ್ಗೆ ಚಿಂತಿಸುವ ಅಗತ್ಯವಿಲ್ಲ.", delay: 2600, type: 'response' }
        ]
      },
      missing: {
        en: [
          { text: "🚨 [POLICE AGENT]: Extracting physical description & location bounds...", delay: 300, type: 'action' },
          { text: "📸 [SECURITY]: Searching local CCTV grids in real-time.", delay: 1500, type: 'action' },
          { text: "A missing person alert has been triggered to all local units. An officer is assigned.", delay: 2500, type: 'response' }
        ],
        hi: [
          { text: "🚨 [पुलिस एजेंट]: शारीरिक विवरण निकाला जा रहा है... दायरा तय किया जा रहा है।", delay: 300, type: 'action' },
          { text: "📸 [सुरक्षा]: इलाके के CCTV कैमरे खंगाले जा रहे हैं।", delay: 1500, type: 'action' },
          { text: "गुमशुदा की रिपोर्ट सभी पुलिस बलों को भेज दी गई है। एक अधिकारी को नियुक्त किया गया है।", delay: 2500, type: 'response' }
        ],
        kn: [
          { text: "🚨 [ಪೊಲೀಸ್ ಏಜೆಂಟ್]: ಕಾಣೆಯಾದವರ ಮಾಹಿತಿಯನ್ನು ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...", delay: 300, type: 'action' },
          { text: "📸 [ಭದ್ರತೆ]: ಸ್ಥಳೀಯ ಸಿಸಿಟಿವಿ ಕ್ಯಾಮೆರಾಗಳನ್ನು ಹುಡುಕಲಾಗುತ್ತಿದೆ.", delay: 1500, type: 'action' },
          { text: "ಕಾಣೆಯಾದವರ ಅಲರ್ಟ್ ಅನ್ನು ಎಲ್ಲಾ ಪೊಲೀಸ್ ಘಟಕಗಳಿಗೆ ಕಳುಹಿಸಲಾಗಿದೆ. ಒಬ್ಬ ಅಧಿಕಾರಿಯನ್ನು ನೇಮಿಸಲಾಗಿದೆ.", delay: 2500, type: 'response' }
        ]
      },
      hello: {
        en: [
          { text: "🧠 [SYSTEM]: Core neural link established. Ready for emergency protocols.", delay: 300, type: 'action' },
          { text: "Hi! I am the Rescue-Net AI. I am constantly monitoring for emergencies. If you have a crisis, describe it to me instantly.", delay: 1200, type: 'response' }
        ],
        hi: [
          { text: "🧠 [सिस्टम]: न्यूरल लिंक स्थापित। प्रोटोकॉल तैयार है।", delay: 300, type: 'action' },
          { text: "नमस्ते! मैं रेस्क्यू-नेट एआई हूँ। कृपया अपनी आपातकालीन स्थिति बताएं।", delay: 1200, type: 'response' }
        ],
        kn: [
          { text: "🧠 [ಸಿಸ್ಟಮ್]: ಸಿಸ್ಟಮ್ ಸಿದ್ಧವಾಗಿದೆ.", delay: 300, type: 'action' },
          { text: "ನಮಸ್ಕಾರ! ನಾನು ರೆಸ್ಕ್ಯೂ-ನೆಟ್. ನಿಮ್ಮ ತುರ್ತು ಪರಿಸ್ಥಿತಿಯನ್ನು ವಿವರಿಸಿ.", delay: 1200, type: 'response' }
        ]
      },
      default: {
        en: [{ text: "Please provide specific details: accident, police, checking insurance, or identity.", delay: 800, type: 'response' }],
        hi: [{ text: "कृपया स्पष्ट विवरण दें: दुर्घटना, पुलिस, बीमा की जांच, या पहचान।", delay: 800, type: 'response' }],
        kn: [{ text: "ದಯವಿಟ್ಟು ನಿರ್ದಿಷ್ಟ ವಿವರಗಳನ್ನು ನೀಡಿ: ಅಪಘಾತ, ಪೊಲೀಸ್, ವಿಮೆ, ಅಥವಾ ಗುರುತು.", delay: 800, type: 'response' }]
      }
    };

    let intent = 'default';
    if (/accident|hurt|crash|emergency|durghatna|chot|takkar|apaghata|gaaya/i.test(lowerInput)) intent = 'accident';
    else if (/unconscious|blood|identity|who|behosh|khoon|pehchan|prajne|rakta/i.test(lowerInput)) intent = 'identity';
    else if (/money|pay|fund|insurance|wallet|paisa|bima|hana|dudu|vime/i.test(lowerInput)) intent = 'finance';
    else if (/missing|lost|police|chori|lapata|kaledu|huduku/i.test(lowerInput)) intent = 'missing';
    else if (/hi|hello|namaste|namaskara|hey/i.test(lowerInput)) intent = 'hello';

    const sequence = sequences[intent][language];

    // Execute the action sequence to simulate real-agent background thoughts
    sequence.forEach(step => {
      setTimeout(() => {
        setActiveSession(curr => {
          if (!curr) return curr;
          return {
            ...curr,
            history: [...curr.history, { 
              sender: 'agent', 
              text: step.text,
              isAction: step.type === 'action'
            }]
          };
        });
        
        if (step.type === 'response') {
          speak(step.text);
          closeTimeoutRef.current = setTimeout(() => {
            setActiveSession(null);
          }, 15000); // Wait longer after speaking
        }
      }, step.delay);
    });
  };

  const handleUserSubmit = (e) => {
    e.preventDefault();
    processUserInput(inputText);
  };

  const handleMicClick = () => {
    // Clear auto-close timeout while listening
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported in this browser. Please use Chrome/Edge or type your question.");
      return;
    }
    
    const recognition = new SpeechRecognition();
    recognition.lang = language === 'hi' ? 'hi-IN' : language === 'kn' ? 'kn-IN' : 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;
    
    recognition.onstart = () => {
      setIsListening(true);
    };
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setIsListening(false);
      
      // Auto-submit after voice is recognized properly referencing transcript
      processUserInput(transcript);
    };
    
    recognition.onerror = (event) => {
      setIsListening(false);
      if (event.error === 'not-allowed') {
        alert("Microphone access is blocked! Please allow microphone permissions in your browser site settings.");
      } else if (event.error === 'network') {
        alert("Speech recognition network error: Your browser's speech service requires an active internet connection, or you may be using a browser (like Brave/Chromium) that lacks built-in speech API support. If the problem persists, please type your message instead.");
      } else {
        console.error("Speech recognition error:", event.error);
      }
    };
    
    recognition.onend = () => {
      setIsListening(false);
    };
    
    try {
      recognition.start();
    } catch (e) {
      console.error(e);
      alert("Microphone failed to start. Try refreshing the page.");
    }
  };

  return (
    <>
      <div className="app-header">
        <div className="app-subtitle">Phase 3 Emergency AI</div>
        <h2>Rescue-Net</h2>
      </div>

      {activeSession && (
        <div className="glass-panel chat-overlay">
          <div className="chat-header">
            <div className="chat-title" style={{ display: 'flex', gap: '15px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div className="pulse-dot"></div>
                {activeSession.agent.name}
              </div>
              <select 
                value={language} 
                onChange={(e) => setLanguage(e.target.value)}
                style={{ background: 'rgba(0,0,0,0.3)', color: 'var(--neon-blue)', border: '1px solid var(--neon-blue)', borderRadius: '6px', padding: '2px 5px', outline: 'none' }}
              >
                <option value="en">Eng</option>
                <option value="hi">हिंदी</option>
                <option value="kn">ಕನ್ನಡ</option>
              </select>
            </div>
            <button type="button" onClick={() => setActiveSession(null)} className="close-btn" title="Close Session">
              ✕
            </button>
          </div>
          
          <div className="chat-history" ref={chatHistoryRef}>
            {activeSession.history.map((msg, idx) => (
              <div key={idx} className={`message-bubble ${msg.sender === 'user' ? 'message-user' : (msg.isAction ? 'message-action' : 'message-agent')}`}>
                {msg.text}
              </div>
            ))}
          </div>

          <form id="chat-form" onSubmit={handleUserSubmit} className="chat-form">
            <button 
              type="button" 
              onClick={handleMicClick} 
              className={`mic-btn ${isListening ? 'listening' : ''}`}
              title="Voice Input"
            >
              {isListening ? '🎙️' : '🎤'}
            </button>
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your emergency query..."
              className="chat-input"
            />
          </form>
        </div>
      )}

      {tutorialStep < tutorialContent.length && !activeSession && (
        <div className="tutorial-panel">
          <div className="pulse-dot" style={{ position: 'absolute', top: 20, right: 20 }}></div>
          <div className="tutorial-title">{tutorialContent[tutorialStep].title}</div>
          <div className="tutorial-text">{tutorialContent[tutorialStep].text}</div>
          <button 
            className="tutorial-btn" 
            onClick={() => setTutorialStep(s => s + 1)}
          >
            {tutorialStep === tutorialContent.length - 1 ? "Start Simulation" : "Next ➔"}
          </button>
          
          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '8px' }}>
            {tutorialContent.map((_, i) => (
              <div key={i} style={{ width: '8px', height: '8px', borderRadius: '50%', background: i === tutorialStep ? 'var(--neon-blue)' : 'rgba(255,255,255,0.2)' }} />
            ))}
          </div>
        </div>
      )}

      <Canvas style={{ height: '100vh', width: '100vw', position: 'absolute', top: 0, left: 0, zIndex: 0 }} camera={{ position: [0, 5, 12], fov: 45 }}>
        <color attach="background" args={['#0a0e17']} />
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 10, 7]} intensity={1.5} color="#00f3ff" />
        <pointLight position={[-5, -5, -5]} intensity={1} color="#ff00f3" />
        <Sparkles count={200} scale={25} size={3} speed={0.2} opacity={0.4} noise={0.1} color="#00f3ff" />
        <Sparkles count={50} scale={15} size={5} speed={0.5} opacity={0.2} noise={0.2} color="#ffffff" />
        {agents.map(agent => (
          <Agent
            key={agent.id}
            id={agent.id}
            position={agent.position}
            color={agent.color}
            message={agent.message}
            onClick={() => handleAgentClick(agent)}
          />
        ))}
      </Canvas>
    </>
  );
}