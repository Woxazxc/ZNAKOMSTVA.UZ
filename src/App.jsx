import { useState, useEffect, useRef } from "react";
import {
  Heart,
  X,
  MessageCircle,
  User,
  ShieldAlert,
  Award,
  Compass,
  Check,
  ArrowRight,
  Eye,
  Send,
  Sparkles,
  Filter,
  CheckCircle2,
  Lock,
  LogOut,
  SlidersHorizontal,
  Mic,
  Video,
  Image,
  Play,
  Pause,
  PhoneOff,
  Palette,
  Sun,
  Moon,
  Smile,
  Film,
} from "lucide-react";

const VOICE_WAVEFORM_BARS = [
  38, 62, 45, 78, 34, 56, 88, 42, 70, 52, 80, 36, 64, 48,
];

const INITIAL_PROFILES = [
  {
    id: "f1",
    name: "Sevara",
    age: 22,
    gender: "Ayol",
    city: "Toshkent",
    bio: "IT talabasi. Kitob o'qishni, kod yozishni va kechki Toshkentda sayr qilishni yaxshi ko'raman. ✨ Samimiy va maqsadli suhbatdosh qidiryapman.",
    interests: ["IT/Dasturlash", "Kitobxonlik", "Sayohat", "Kofe"],
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600",
    isOnline: true,
    isPremium: false,
    verified: true,
    voiceAccent: "uz-UZ",
    sampleVideos: [
      "https://assets.mixkit.co/videos/preview/mixkit-young-woman-smiling-at-camera-41551-large.mp4",
    ],
    samplePhotos: [
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=600",
    ],
  },
  {
    id: "f2",
    name: "Madina",
    age: 25,
    gender: "Ayol",
    city: "Samarqand",
    bio: "Milliy va zamonaviy taomlar pishirish jonu dilim. Tabiat qo'ynida dam olish va rasm chizishni yoqtiraman. 🎨 Jiddiy insonlar uchun.",
    interests: ["Pazandachilik", "San'at", "Tabiat", "Kino"],
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=600",
    isOnline: false,
    isPremium: true,
    verified: true,
    voiceAccent: "uz-UZ",
    sampleVideos: [
      "https://assets.mixkit.co/videos/preview/mixkit-woman-smiling-holding-her-phone-41481-large.mp4",
    ],
    samplePhotos: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600",
    ],
  },
  {
    id: "f3",
    name: "Kamola",
    age: 20,
    gender: "Ayol",
    city: "Buxoro",
    bio: "Chet tillarini o'rganishga juda qiziqaman. Hozirda ingliz va koreys tillarini o'rganyapman. Musiqa tinglash sevimli mashg'ulotim. 🎵",
    interests: ["Tillar", "Musiqa", "Raqs", "Dizayn"],
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600",
    isOnline: true,
    isPremium: false,
    verified: false,
    voiceAccent: "tr-TR",
    sampleVideos: [
      "https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-sign-backlight-41865-large.mp4",
    ],
    samplePhotos: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600",
    ],
  },
  {
    id: "f4",
    name: "Zilola",
    age: 27,
    gender: "Ayol",
    city: "Toshkent",
    bio: "Grafik dizaynerman. Kofe, estetika va chuqur mavzulardagi suhbatlar — mening dunyoqarashim. Dunyoni sayohat qilish eng katta orzuyim. 🌍",
    interests: ["Dizayn", "Fotografiya", "Sayohat", "Psixologiya"],
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600",
    isOnline: true,
    isPremium: true,
    verified: true,
    voiceAccent: "uz-UZ",
    sampleVideos: [
      "https://assets.mixkit.co/videos/preview/mixkit-young-woman-smiling-at-camera-41551-large.mp4",
    ],
    samplePhotos: [
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=600",
    ],
  },
  {
    id: "m1",
    name: "Jasur",
    age: 26,
    gender: "Erkak",
    city: "Toshkent",
    bio: "Senior dasturchiman. Sport, sog'lom turmush tarzi va faol dam olish tarafdoriman. Aqlli va maqsadli qizlar bilan tanishmoqchiman. 💻🏋️‍♂️",
    interests: ["IT/Dasturlash", "Fitness", "Sayohat", "Moliya"],
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600",
    isOnline: true,
    isPremium: true,
    verified: true,
    voiceAccent: "tr-TR",
    sampleVideos: [],
    samplePhotos: [],
  },
];

const INITIAL_CHATS = [
  {
    id: "chat_1",
    profileId: "f1", // Sevara
    wallpaperTheme: "sevgi", // default wallpaper
    messages: [
      {
        sender: "them",
        text: "Salom! Profilingiz menga juda yoqdi 😊",
        timestamp: "10:30",
        type: "text",
      },
      {
        sender: "you",
        text: "Salom Sevara, rahmat! Sizniki ham ajoyib ekan.",
        timestamp: "10:32",
        type: "text",
      },
      {
        sender: "them",
        text: "Mening ovozimni eshitib ko'ring, darsdan keyin yozgandim!",
        timestamp: "10:34",
        type: "text",
      },
      {
        sender: "them",
        text: "Salom, yaxshimisiz? Siz bilan yaqindan tanishganimdan juda xursandman!",
        timestamp: "10:34",
        type: "voice",
        mediaUrl: "speech_synth",
      },
    ],
  },
];

const INITIAL_GUESTS = [
  { profileId: "f1", time: "5 daqiqa oldin" },
  { profileId: "f2", time: "2 soat oldin" },
  { profileId: "f4", time: "Bugun, 12:40" },
];

const INITIAL_REPORTS = [
  {
    id: 1,
    reporter: "Kamola",
    reportedUser: "Farruh",
    reason: "Yozishmada noo'rin so'zlardan foydalandi",
    status: "Kutilmoqda",
  },
];

const UZBEK_CITIES = [
  "Toshkent",
  "Samarqand",
  "Buxoro",
  "Andijon",
  "Farg'ona",
  "Namangan",
  "Xorazm",
  "Qarshi",
  "Nukus",
  "Navoiy",
  "Jizzax",
  "Guliston",
  "Termiz",
  "Surxandaryo",
];

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const isAdmin = currentUser?.role === "CEO";
  const [profiles, setProfiles] = useState(INITIAL_PROFILES);
  const [persistedUsers, setPersistedUsers] = useState([]);
  const [currentTab, setCurrentTab] = useState("welcome"); // welcome, login, register, discovery, chats, guests, profile, admin
  const [selectedGender, setSelectedGender] = useState("Erkak");
  const [vipModalOpen, setVipModalOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [authError, setAuthError] = useState(null);

  // Global Theme States
  const [globalTheme, setGlobalTheme] = useState("dark"); // 'light', 'dark', 'love'
  const [showThemeMenu, setShowThemeMenu] = useState(false);

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editName, setEditName] = useState("");
  const [editAge, setEditAge] = useState(18);
  const [editCity, setEditCity] = useState("Toshkent");
  const [editBio, setEditBio] = useState("");
  const [editInterests, setEditInterests] = useState([]);
  const [editAvatarFile, setEditAvatarFile] = useState(null);
  const [editAvatarPreview, setEditAvatarPreview] = useState(null);

  const [likedProfiles, setLikedProfiles] = useState([]);
  const [dislikedProfiles, setDislikedProfiles] = useState([]);
  const [matchOverlay, setMatchOverlay] = useState(null);
  const [cityFilter, setCityFilter] = useState("Hammasi");
  const [ageRange, setAgeRange] = useState([18, 35]);

  const [chats, setChats] = useState(INITIAL_CHATS);
  const [activeChatId, setActiveChatId] = useState(null);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [playingMessageId, setPlayingMessageId] = useState(null);

  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const recordingTimerRef = useRef(null);

  const [previewMediaUrl, setPreviewMediaUrl] = useState(null);
  const [previewMediaType, setPreviewMediaType] = useState(null);

  const [videoCallActive, setVideoCallActive] = useState(false);
  const [videoCallProfile, setVideoCallProfile] = useState(null);
  const [userVideoStream, setUserVideoStream] = useState(null);
  const userVideoRef = useRef(null);
  const callTimerRef = useRef(null);
  const [callDuration, setCallDuration] = useState(0);

  const [reports] = useState(INITIAL_REPORTS);
  const [adminView, setAdminView] = useState("dashboard");
  const [systemLogs, setSystemLogs] = useState([
    {
      id: 1,
      text: "Yangi tizim muvaffaqiyatli yuklandi.",
      time: "10:00",
      type: "info",
    },
    {
      id: 2,
      text: "Xavfsizlik protokollari faollashtirildi.",
      time: "10:05",
      type: "success",
    },
  ]);

  // Load persisted current user from backend on mount
  useEffect(() => {
    fetch("/api/current")
      .then((r) => r.json())
      .then((data) => {
        if (data && data.currentUser) {
          setCurrentUser(data.currentUser);
          setCurrentTab("discovery");
        }
      })
      .catch((err) => {
        console.error("Could not fetch current user:", err);
        showToast(
          "Server bilan boglanishda xatolik — server ishga tushganligini tekshiring",
          "error",
        );
      });

    fetch("/api/users")
      .then((r) => r.json())
      .then((data) => {
        if (data && Array.isArray(data.users)) {
          setPersistedUsers(data.users);
        }
      })
      .catch(() => {
        // ignore
      });
  }, []);

  // Floating hearts generator for Love Mode
  const [floatingHearts, setFloatingHearts] = useState([]);

  useEffect(() => {
    if (globalTheme === "love") {
      const interval = setInterval(() => {
        setFloatingHearts((prev) =>
          [
            ...prev,
            {
              id: Date.now() + Math.random(),
              left: Math.random() * 100,
              size: Math.random() * 20 + 10,
              duration: Math.random() * 5 + 4,
            },
          ].slice(-30),
        ); // limit hearts at 30 to preserve memory
      }, 700);
      return () => clearInterval(interval);
    }
  }, [globalTheme]);

  const handleGlobalThemeChange = (theme) => {
    setGlobalTheme(theme);
    if (theme !== "love") {
      setFloatingHearts([]);
    }
    setShowThemeMenu(false);
  };

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const playSpeechSynthesis = (text, langCode = "uz-UZ", msgId) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();

      if (playingMessageId === msgId) {
        setPlayingMessageId(null);
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = langCode;
      const voices = window.speechSynthesis.getVoices();
      const selectedVoice =
        voices.find(
          (v) => v.lang.startsWith("tr") || v.lang.startsWith("uz"),
        ) ||
        voices.find((v) => v.lang.startsWith("ru")) ||
        voices[0];

      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      utterance.pitch = 1.25;
      utterance.rate = 0.95;

      utterance.onend = () => {
        setPlayingMessageId(null);
      };

      utterance.onerror = () => {
        setPlayingMessageId(null);
      };

      setPlayingMessageId(msgId);
      window.speechSynthesis.speak(utterance);
    } else {
      showToast(
        "Ovozli xabar tizimi brauzeringizda qo'llab-quvvatlanmaydi.",
        "error",
      );
    }
  };

  const startVoiceRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      let chunks = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(chunks, { type: "audio/webm" });
        const audioUrl = URL.createObjectURL(audioBlob);
        sendRecordedVoice(audioUrl);
      };

      setMediaRecorder(recorder);
      recorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      recordingTimerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      console.error(err);
      showToast(
        "Mikrofonga kirish ruxsat etilmadi yoki qurilma topilmadi!",
        "error",
      );
    }
  };

  const stopVoiceRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks().forEach((track) => track.stop());
      setIsRecording(false);
      clearInterval(recordingTimerRef.current);
    }
  };

  const sendRecordedVoice = (audioUrl) => {
    if (!activeChatId) return;
    const activeChat = chats.find((c) => c.id === activeChatId);
    if (!activeChat) return;

    const newMsg = {
      sender: "you",
      text: "Ovozli xabar yuborildi",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      type: "voice",
      mediaUrl: audioUrl,
    };

    setChats((prevChats) =>
      prevChats.map((c) => {
        if (c.id === activeChatId) {
          return { ...c, messages: [...c.messages, newMsg] };
        }
        return c;
      }),
    );

    triggerPartnerReply(
      activeChat.profileId,
      "Ovozli xabaringiz uchun rahmat! Juda ajoyib ovozingiz bor ekan 😍",
    );
  };

  const startVideoCall = async (profile) => {
    setVideoCallProfile(profile);
    setVideoCallActive(true);
    setCallDuration(0);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setUserVideoStream(stream);
      if (userVideoRef.current) {
        userVideoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.warn("Kamera topilmadi yoki ruxsat etilmadi:", err);
    }

    callTimerRef.current = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);
  };

  const endVideoCall = () => {
    if (userVideoStream) {
      userVideoStream.getTracks().forEach((track) => track.stop());
      setUserVideoStream(null);
    }
    clearInterval(callTimerRef.current);
    setVideoCallActive(false);
    setVideoCallProfile(null);
    showToast("Muloqot tugallandi.");
  };

  const formatDuration = (sec) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const generateAIResponse = async (
    profile,
    conversationHistory,
    userMessage,
    requestedType = null,
  ) => {
    if (requestedType === "photo") {
      const photoUrl =
        profile.samplePhotos[
          Math.floor(Math.random() * profile.samplePhotos.length)
        ] || profile.avatar;
      return {
        text: "Siz so'ragan rasmni yubordim! Qanday chiqibdi? 😉✨",
        type: "photo",
        mediaUrl: photoUrl,
      };
    }

    if (requestedType === "video") {
      const videoUrl =
        profile.sampleVideos[0] ||
        "https://assets.mixkit.co/videos/preview/mixkit-young-woman-smiling-at-camera-41551-large.mp4";
      return {
        text: "Sizga maxsus video xabar (krujok) yo'llayapman! 📹🌸",
        type: "video",
        mediaUrl: videoUrl,
      };
    }

    if (requestedType === "voice") {
      const voiceTexts = [
        "Salom! Hozir uydaman, darslardan bo'shab siz bilan gaplashib o'tirgandim.",
        "Siz bilan gaplashish judayam yoqimli ekan, samimiy muloqot uchun rahmat! 😊",
        "Rasmim yoqdimi? Rahmat, siz ham ancha kelishgan yigit ekansiz!",
      ];
      const selectedVoiceText =
        voiceTexts[Math.floor(Math.random() * voiceTexts.length)];
      return {
        text: selectedVoiceText,
        type: "voice",
        mediaUrl: "speech_synth",
      };
    }

    const fallbacks = [
      "Ajoyib! O'zingiz haqingizda yana nimalar gapirib bera olasiz? 😊",
      "Siz bilan suhbatlashish judayam yoqimli ekan!",
      "Hozir biroz band edim, lekin sizga darhol javob yozishga harakat qildim. Nimalar qilyapsiz?",
    ];
    return {
      text: fallbacks[Math.floor(Math.random() * fallbacks.length)],
      type: "text",
    };
  };

  const triggerPartnerReply = async (
    profileId,
    userText,
    requestedType = null,
  ) => {
    setIsTyping(true);
    const activeChat = chats.find((c) => c.profileId === profileId);
    if (!activeChat) return;

    const matchedProfile = profiles.find((p) => p.id === profileId);
    const aiResponse = await generateAIResponse(
      matchedProfile,
      activeChat?.messages || [],
      userText,
      requestedType,
    );

    setTimeout(() => {
      setChats((prevChats) =>
        prevChats.map((c) => {
          if (c.profileId === profileId) {
            return {
              ...c,
              messages: [
                ...c.messages,
                {
                  sender: "them",
                  text: aiResponse.text,
                  timestamp: new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  }),
                  type: aiResponse.type || "text",
                  mediaUrl: aiResponse.mediaUrl,
                },
              ],
            };
          }
          return c;
        }),
      );
      setIsTyping(false);
    }, 1500);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value.trim();
    const username = registerUsername.trim();
    const password = registerPassword;
    const age = parseInt(e.target.age.value);
    const city = e.target.city.value;
    const bio = e.target.bio.value.trim();

    if (!name || !age || !username || !password) {
      setAuthError("Iltimos, barcha maydonlarni to'ldiring.");
      return;
    }

    if (age < 18) {
      setAuthError("Tizimdan faqat 18 yoshdan kattalar foydalanishi mumkin!");
      return;
    }

    const newUser = {
      username,
      password,
      name,
      age,
      city,
      gender: selectedGender,
      bio: bio || "Salom! Men ham Znakomstva.uz daman.",
      interests: ["IT/Dasturlash", "Kofe"],
      avatar:
        selectedGender === "Erkak"
          ? "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=600"
          : "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600",
      isPremium: false,
      verified: true,
      role: "user",
    };

    // Send to backend
    fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    })
      .then((r) => r.json())
      .then((created) => {
        setCurrentUser(created);
        setPersistedUsers((prev) => [...prev, created]);
        setAuthError(null);

        const initialMatchedChat = {
          id: `chat_${Date.now()}`,
          profileId: "f1",
          wallpaperTheme: "sevgi",
          messages: [
            {
              sender: "them",
              text: `Salom ${created.name}! Profilingiz menga judayam yoqdi, muloqot qila olamizmi? 😊`,
              timestamp: "10:30",
              type: "text",
            },
          ],
        };

        setChats([initialMatchedChat, ...INITIAL_CHATS]);

        setSystemLogs((prev) => [
          {
            id: Date.now(),
            text: `Yangi foydalanuvchi muvaffaqiyatli ro'yxatdan o'tdi: ${created.name}`,
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            type: "success",
          },
          ...prev,
        ]);

        showToast("Profil muvaffaqiyatli yaratildi! 🎉");
        setCurrentTab("discovery");
      })
      .catch(() => {
        showToast("Server bilan bog'lanishda xatolik", "error");
      });
  };

  const handleStartEdit = () => {
    if (!currentUser) return;
    setEditName(currentUser.name);
    setEditAge(currentUser.age);
    setEditCity(currentUser.city);
    setEditBio(currentUser.bio);
    setEditInterests(currentUser.interests || ["IT/Dasturlash", "Kofe"]);
    setEditAvatarPreview(currentUser.avatar || null);
    setIsEditingProfile(true);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const username = loginUsername.trim();
    const password = loginPassword;

    if (!username || !password) {
      setAuthError("Iltimos, login va parolni kiriting.");
      return;
    }

    fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((r) => {
        if (!r.ok) {
          throw new Error("Login yoki parol noto'g'ri.");
        }
        return r.json();
      })
      .then((user) => {
        setCurrentUser(user);
        setAuthError(null);
        setCurrentTab("discovery");
        showToast("Kirish muvaffaqiyatli amalga oshirildi! ✅");
      })
      .catch((err) => {
        setAuthError(err.message || "Kirishda xatolik. Qayta urinib ko'ring.");
      });
  };

  const handleLogout = () => {
    fetch("/api/logout", {
      method: "POST",
    })
      .then(() => {
        setCurrentUser(null);
        setCurrentTab("welcome");
        showToast("Siz tizimdan chiqdingiz.", "success");
      })
      .catch(() => {
        setCurrentUser(null);
        setCurrentTab("welcome");
      });
  };

  const handleAvatarSelect = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setEditAvatarFile(file);
    setEditAvatarPreview(url);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (!editName.trim() || !editAge) {
      showToast("Ism va yosh kiritilishi shart!", "error");
      return;
    }

    const doSave = async () => {
      try {
        let avatarUrl = editAvatarPreview;
        if (editAvatarFile) {
          const fd = new FormData();
          fd.append("avatar", editAvatarFile);
          const up = await fetch("/api/upload-avatar", {
            method: "POST",
            body: fd,
          });
          const upRes = await up.json();
          avatarUrl = upRes.url || avatarUrl;
        }

        const payload = {
          name: editName.trim(),
          age: parseInt(editAge),
          city: editCity,
          bio: editBio.trim() || "Salom!",
          avatar: avatarUrl,
          interests: editInterests,
        };

        if (currentUser && currentUser.id) {
          const res = await fetch(`/api/users/${currentUser.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
          const updated = await res.json();
          setCurrentUser(updated);
          setPersistedUsers((prev) =>
            prev.map((user) => (user.id === updated.id ? updated : user)),
          );
        } else {
          // fallback to local update
          setCurrentUser((prev) => ({ ...prev, ...payload }));
        }

        setIsEditingProfile(false);
        setEditAvatarFile(null);
        showToast("Profil muvaffaqiyatli yangilandi! ✨");
      } catch (err) {
        console.error(err);
        showToast("Yangilashda xatolik yuz berdi", "error");
      }
    };

    doSave();
  };

  const handleLike = (profile) => {
    setLikedProfiles([...likedProfiles, profile.id]);
    const isMatch = Math.random() < 0.75;

    if (isMatch) {
      const existingChat = chats.find((c) => c.profileId === profile.id);
      if (!existingChat) {
        const newChat = {
          id: `chat_${Date.now()}`,
          profileId: profile.id,
          wallpaperTheme: "sevgi",
          messages: [
            {
              sender: "them",
              text: `Salom! Biz bir-birimizga mos keldik 😍 Qayerdansiz?`,
              timestamp: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
              type: "text",
            },
          ],
        };
        setChats((prev) => [newChat, ...prev]);
      }
      setMatchOverlay(profile);
    } else {
      showToast(`${profile.name} profilingizga qiziqish bildirdi!`);
    }
  };

  const handleDislike = (profile) => {
    setDislikedProfiles([...dislikedProfiles, profile.id]);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!currentMessage.trim() || !activeChatId) return;

    const activeChat = chats.find((c) => c.id === activeChatId);
    if (!activeChat) return;

    const userMsgText = currentMessage;

    setChats((prevChats) =>
      prevChats.map((c) => {
        if (c.id === activeChatId) {
          return {
            ...c,
            messages: [
              ...c.messages,
              {
                sender: "you",
                text: userMsgText,
                timestamp: new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
                type: "text",
              },
            ],
          };
        }
        return c;
      }),
    );

    setCurrentMessage("");

    let requestedType = null;
    if (
      userMsgText.toLowerCase().includes("rasm") ||
      userMsgText.toLowerCase().includes("foto")
    ) {
      requestedType = "photo";
    } else if (
      userMsgText.toLowerCase().includes("ovoz") ||
      userMsgText.toLowerCase().includes("golos") ||
      userMsgText.toLowerCase().includes("eshit")
    ) {
      requestedType = "voice";
    } else if (
      userMsgText.toLowerCase().includes("video") ||
      userMsgText.toLowerCase().includes("krujok")
    ) {
      requestedType = "video";
    }

    triggerPartnerReply(activeChat.profileId, userMsgText, requestedType);
  };

  const handleChatThemeChange = (chatId, selectedTheme) => {
    setChats((prevChats) =>
      prevChats.map((c) => {
        if (c.id === chatId) {
          return { ...c, wallpaperTheme: selectedTheme };
        }
        return c;
      }),
    );
    showToast(`Mavzu o'zgartirildi: ${selectedTheme.toUpperCase()}`);
  };

  const filteredProfiles = profiles.filter((p) => {
    if (!currentUser) return true;

    const oppositeGender = currentUser.gender === "Erkak" ? "Ayol" : "Erkak";
    const matchesGender = p.gender === oppositeGender;

    const matchesCity = cityFilter === "Hammasi" || p.city === cityFilter;
    const matchesAge = p.age >= ageRange[0] && p.age <= ageRange[1];

    const notSwiped =
      !likedProfiles.includes(p.id) && !dislikedProfiles.includes(p.id);

    return matchesGender && matchesCity && matchesAge && notSwiped;
  });

  const activeProfile = filteredProfiles[0] || null;

  const handleToggleVerify = async (id) => {
    try {
      const target = persistedUsers.find((u) => u.id === id);
      if (!target) return;

      const updated = await fetch(`/api/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ verified: !target.verified }),
      }).then((r) => r.json());

      setPersistedUsers((prev) =>
        prev.map((user) => (user.id === updated.id ? updated : user)),
      );
      showToast("Profil verifikatsiya statusi yangilandi!");
    } catch (err) {
      console.error(err);
      showToast("Verifikatsiya yangilanmadi", "error");
    }
  };

  const handleBanUser = async (id) => {
    try {
      await fetch(`/api/users/${id}`, {
        method: "DELETE",
      });
      setPersistedUsers((prev) => prev.filter((user) => user.id !== id));
      if (currentUser && currentUser.id === id) {
        handleLogout();
      }
      showToast("Foydalanuvchi muvaffaqiyatli bloklandi!");
    } catch (err) {
      console.error(err);
      showToast("Foydalanuvchi bloklanmadi", "error");
    }
  };

  // Theme Styling Objects
  const themeStyles = {
    light: {
      bg: "bg-[#FFF0F5]", // Lavender blush base
      panel:
        "bg-white border-pink-100 shadow-[0_10px_30px_rgba(244,63,94,0.06)]",
      header: "bg-pink-100/80 border-b border-pink-200/60 text-slate-800",
      textMain: "text-slate-800",
      textSec: "text-slate-500",
      card: "bg-pink-50/50 border border-pink-100",
      input:
        "bg-white border border-pink-200 text-slate-800 focus:border-pink-500",
      btnPrimary:
        "bg-gradient-to-r from-pink-500 to-rose-500 hover:brightness-105 text-white shadow-md shadow-pink-500/20",
      tabBar: "bg-white border-t border-pink-100",
      tabActive: "text-pink-600",
      badge: "bg-pink-100 text-pink-700 border border-pink-200",
    },
    dark: {
      bg: "bg-[#070B1E]", // Deep Dark Blue base
      panel:
        "bg-[#0A0F24] border-blue-900/30 shadow-[0_0_50px_rgba(30,58,138,0.25)]",
      header: "bg-[#121B3A] border-b border-blue-950/60 text-white",
      textMain: "text-[#E2E8F0]",
      textSec: "text-slate-400",
      card: "bg-[#121B3A] border border-blue-900/20",
      input:
        "bg-[#121B3A] border border-blue-900/30 text-white focus:border-blue-500",
      btnPrimary:
        "bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700 hover:brightness-110 text-white shadow-lg shadow-blue-500/20",
      tabBar: "bg-[#121B3A] border-t border-blue-950/60",
      tabActive: "text-blue-500",
      badge: "bg-blue-500/10 border border-blue-500/30 text-blue-400",
    },
    love: {
      bg: "bg-[#1F0817]", // Deep Romantic Burgundy base
      panel:
        "bg-[#2D0D22]/95 border-pink-900/40 shadow-[0_0_60px_rgba(236,72,153,0.3)] backdrop-blur-md",
      header: "bg-[#3D1230]/90 border-b border-pink-950/50 text-pink-100",
      textMain: "text-pink-50",
      textSec: "text-pink-300/70",
      card: "bg-[#3D1230]/60 border border-pink-500/20",
      input:
        "bg-[#3D1230]/80 border border-pink-500/30 text-pink-100 focus:border-pink-400",
      btnPrimary:
        "bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 hover:brightness-110 text-white shadow-lg shadow-pink-500/30",
      tabBar: "bg-[#3D1230]/90 border-t border-pink-950/50",
      tabActive: "text-pink-400",
      badge: "bg-pink-500/15 border border-pink-500/40 text-pink-400",
    },
  };

  const currentStyle = themeStyles[globalTheme];

  // Chat Wallpaper Styles
  const chatWallpapers = {
    sevgi:
      "bg-gradient-to-b from-[#4A0E2E] via-[#2D0B1E] to-[#1F0817] relative overflow-hidden pattern-hearts",
    anime:
      "bg-gradient-to-b from-[#111827] via-[#311042] to-[#1F002A] relative overflow-hidden pattern-starry",
    multik:
      "bg-gradient-to-b from-[#FFFBEB] via-[#FEF3C7] to-[#FDE68A] relative overflow-hidden pattern-playful",
    kino: "bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#020617] relative overflow-hidden pattern-cinematic",
  };

  return (
    <div
      className={`min-h-screen ${currentStyle.bg} ${globalTheme === "light" ? "text-slate-800" : "text-[#E2E8F0]"} font-sans flex flex-col items-center justify-center p-2 sm:p-4 select-none relative transition-colors duration-500 overflow-hidden`}
    >
      {/* Floating Hearts CSS Injection */}
      <style>{`
        @keyframes floatHeart {
          0% {
            transform: translateY(110vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(-20vh) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-heart-flow {
          position: absolute;
          bottom: -50px;
          animation: floatHeart linear infinite;
        }
        .pattern-hearts::before {
          content: '❤️ 💖 💘';
          position: absolute;
          inset: 0;
          opacity: 0.04;
          font-size: 24px;
          line-height: 2.5;
          letter-spacing: 20px;
          pointer-events: none;
        }
        .pattern-starry::before {
          content: '✨ 🌟 💫 🌌';
          position: absolute;
          inset: 0;
          opacity: 0.05;
          font-size: 18px;
          line-height: 3;
          letter-spacing: 15px;
          pointer-events: none;
        }
        .pattern-playful::before {
          content: '🧸 🍭 🎈 🎨';
          position: absolute;
          inset: 0;
          opacity: 0.08;
          font-size: 28px;
          line-height: 2.5;
          letter-spacing: 22px;
          pointer-events: none;
        }
        .pattern-cinematic::before {
          content: '🎬 🍿 🎥 🌟';
          position: absolute;
          inset: 0;
          opacity: 0.05;
          font-size: 20px;
          line-height: 3.5;
          letter-spacing: 25px;
          pointer-events: none;
        }
      `}</style>

      {/* Love Mode Floating Elements */}
      {globalTheme === "love" &&
        floatingHearts.map((heart) => (
          <span
            key={heart.id}
            className="animate-heart-flow text-pink-500/40 pointer-events-none select-none z-0"
            style={{
              left: `${heart.left}%`,
              fontSize: `${heart.size}px`,
              animationDuration: `${heart.duration}s`,
            }}
          >
            ❤️
          </span>
        ))}

      {/* Toast Notification element */}
      {toast && (
        <div
          className={`fixed top-4 z-50 flex items-center gap-2.5 px-5 py-3.5 rounded-2xl shadow-2xl border animate-bounce ${
            toast.type === "success"
              ? "bg-[#121B3A]/95 border-emerald-500/50 text-emerald-400"
              : "bg-[#121B3A]/95 border-rose-500/50 text-rose-400"
          }`}
        >
          <CheckCircle2 className="w-5 h-5 shrink-0 animate-pulse" />
          <span className="font-bold text-xs tracking-wide">
            {toast.message}
          </span>
        </div>
      )}

      {/* Main Core Container */}
      <div
        className={`w-full max-w-md sm:max-w-2xl md:max-w-4xl ${currentStyle.panel} rounded-[32px] overflow-hidden relative flex flex-col h-[92vh] sm:h-[850px] transition-all duration-500 z-10`}
      >
        {/* Universal Top Nav Bar */}
        {currentTab !== "welcome" && currentTab !== "register" && (
          <div
            className={`${currentStyle.header} px-5 py-4 flex items-center justify-between z-20 shrink-0`}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-pink-500 via-rose-500 to-indigo-600 flex items-center justify-center shadow-lg">
                <Heart className="w-5 h-5 text-white fill-white animate-pulse" />
              </div>
              <div>
                <h1 className="font-black text-sm tracking-widest flex items-center gap-1">
                  ZNAKOMSTVA<span className="text-pink-500">.uz</span>
                </h1>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                  <p className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider">
                    Premium panel
                  </p>
                </div>
              </div>
            </div>

            {/* Theme Picker Trigger & VIP badges */}
            <div className="flex items-center gap-2 relative">
              <button
                onClick={() => setShowThemeMenu(!showThemeMenu)}
                className={`p-2 rounded-xl transition-all bg-slate-800/10 ${globalTheme === "love" ? "text-pink-400" : "text-slate-400"} hover:text-white`}
                title="Mavzular"
              >
                <Palette className="w-4 h-4" />
              </button>

              {/* Theme Selector Popover */}
              {showThemeMenu && (
                <div className="absolute right-0 top-12 w-40 bg-slate-900 border border-slate-800 p-2.5 rounded-2xl shadow-2xl z-50 flex flex-col gap-1.5 text-left">
                  <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider px-2 pb-1.5 border-b border-slate-800">
                    Global mavzu
                  </p>

                  <button
                    onClick={() => handleGlobalThemeChange("light")}
                    className={`flex items-center gap-2 text-xs font-semibold px-2.5 py-1.5 rounded-xl ${globalTheme === "light" ? "bg-pink-500/20 text-pink-400" : "text-slate-300 hover:bg-slate-800"}`}
                  >
                    <Sun className="w-3.5 h-3.5" /> Light Mode
                  </button>

                  <button
                    onClick={() => handleGlobalThemeChange("dark")}
                    className={`flex items-center gap-2 text-xs font-semibold px-2.5 py-1.5 rounded-xl ${globalTheme === "dark" ? "bg-blue-500/20 text-blue-400" : "text-slate-300 hover:bg-slate-800"}`}
                  >
                    <Moon className="w-3.5 h-3.5" /> Dark Mode
                  </button>

                  <button
                    onClick={() => handleGlobalThemeChange("love")}
                    className={`flex items-center gap-2 text-xs font-semibold px-2.5 py-1.5 rounded-xl ${globalTheme === "love" ? "bg-pink-600/20 text-pink-500" : "text-slate-300 hover:bg-slate-800"}`}
                  >
                    <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />{" "}
                    Love Mode
                  </button>
                </div>
              )}

              {currentUser?.isPremium ? (
                <span className="bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[9px] font-black px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Award className="w-3.5 h-3.5" /> VIP
                </span>
              ) : (
                <button
                  onClick={() => setVipModalOpen(true)}
                  className="bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 text-[10px] font-black px-3 py-1 rounded-full flex items-center gap-1 hover:brightness-110 active:scale-95 transition-all shadow-lg"
                >
                  <Sparkles className="w-3 h-3" /> VIP
                </button>
              )}

              {isAdmin && (
                <button
                  onClick={() =>
                    setCurrentTab(
                      currentTab === "admin" ? "discovery" : "admin",
                    )
                  }
                  className={`p-1.5 rounded-xl transition-all ${currentTab === "admin" ? "bg-rose-600 text-white shadow-lg shadow-rose-500/30" : "bg-slate-800/10 text-slate-400 hover:text-white"}`}
                  title="Admin boshqaruvi"
                >
                  <ShieldAlert className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Dynamic Screens switcher */}
        <div className="flex-1 overflow-y-auto custom-scrollbar relative flex flex-col z-10">
          {/* Welcome Screen */}
          {currentTab === "welcome" && (
            <div className="flex-1 flex flex-col justify-between p-6 text-center bg-gradient-to-b from-[#0A0F24] via-[#0E173C] to-[#0A0F24]">
              <div className="my-auto space-y-7">
                <div className="relative inline-block mx-auto">
                  <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-pink-500 via-purple-600 to-indigo-600 flex items-center justify-center shadow-2xl relative">
                    <Heart className="w-12 h-12 text-white fill-white animate-pulse" />
                  </div>
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-amber-500 p-2 rounded-full shadow-xl border border-slate-900">
                    <Sparkles className="w-4 h-4 text-slate-950" />
                  </span>
                </div>

                <div className="space-y-2">
                  <h2 className="text-3xl font-black text-white tracking-wider">
                    ZNAKOMSTVA<span className="text-pink-500">.uz</span>
                  </h2>
                  <p className="text-xs text-slate-400 px-6 leading-relaxed font-semibold">
                    Multiversal mavzular va multimedia imkoniyatlari bilan
                    boyitilgan premium o'zbek tanishuv portali!
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-4">
                  <div className="bg-[#121B3A]/60 border border-blue-900/20 p-3 rounded-2xl">
                    <p className="text-lg font-black text-pink-400">20K+</p>
                    <p className="text-[9px] text-slate-400 uppercase font-bold tracking-wider">
                      A'zolar
                    </p>
                  </div>
                  <div className="bg-[#121B3A]/60 border border-blue-900/20 p-3 rounded-2xl animate-pulse">
                    <p className="text-lg font-black text-emerald-400">5.4K+</p>
                    <p className="text-[9px] text-slate-400 uppercase font-bold tracking-wider">
                      Faol
                    </p>
                  </div>
                  <div className="bg-[#121B3A]/60 border border-blue-900/20 p-3 rounded-2xl">
                    <p className="text-lg font-black text-pink-500">Video</p>
                    <p className="text-[9px] text-slate-400 uppercase font-bold tracking-wider">
                      Krujoklar
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-4">
                <button
                  onClick={() => setCurrentTab("login")}
                  className="w-full py-4 bg-gradient-to-r from-pink-500 via-rose-500 to-indigo-600 hover:brightness-110 text-white font-extrabold rounded-2xl shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-base"
                >
                  Kirish / Ro'yxatdan o'tish <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* Login Screen */}
          {currentTab === "login" && (
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-black text-white tracking-wide">
                    Hisobga kirish
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Login va parolingiz bilan tizimga kiring.
                  </p>
                </div>

                <form className="space-y-4" onSubmit={handleLoginSubmit}>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
                      Login (username)
                    </label>
                    <input
                      type="text"
                      value={loginUsername}
                      onChange={(e) => setLoginUsername(e.target.value)}
                      placeholder="Kirish nomi"
                      className="w-full bg-[#121B3A] border border-blue-900/30 rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none focus:border-blue-500 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
                      Parol
                    </label>
                    <input
                      type="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="Parolingizni kiriting"
                      className="w-full bg-[#121B3A] border border-blue-900/30 rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none focus:border-blue-500 transition-all"
                    />
                  </div>

                  {authError && (
                    <div className="text-rose-400 text-xs font-semibold">
                      {authError}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-pink-500 via-rose-500 to-indigo-600 hover:brightness-110 text-white font-extrabold rounded-2xl shadow-xl active:scale-[0.98] transition-all text-base"
                  >
                    Kirish
                  </button>
                </form>

                <div className="text-center text-xs text-slate-400">
                  Hisobingiz yo'qmi?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentTab("register");
                      setAuthError(null);
                    }}
                    className="underline text-pink-400"
                  >
                    Ro'yxatdan o'tish
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Registration Screen */}
          {currentTab === "register" && (
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-black text-white tracking-wide">
                    Profil yaratish
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Sizga eng mos keluvchi suhbatdoshlarni topishimiz uchun
                    ma'lumotlarni kiriting.
                  </p>
                </div>

                <form
                  className="space-y-4"
                  id="register-form"
                  onSubmit={handleRegisterSubmit}
                >
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
                      Ismingiz <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Masalan: Shahzod yoki Sevara"
                      className="w-full bg-[#121B3A] border border-blue-900/30 rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none focus:border-blue-500 transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
                      Login (username) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={registerUsername}
                      onChange={(e) => setRegisterUsername(e.target.value)}
                      required
                      placeholder="Yangi login"
                      className="w-full bg-[#121B3A] border border-blue-900/30 rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none focus:border-blue-500 transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
                      Parol <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="password"
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      required
                      placeholder="Yangi parol"
                      className="w-full bg-[#121B3A] border border-blue-900/30 rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none focus:border-blue-500 transition-all"
                    />
                  </div>

                  <div className="text-[10px] text-slate-400">
                    CEO hisob uchun: <span className="text-pink-400">ceo</span>{" "}
                    / <span className="text-pink-400">ceo123</span>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
                      Yoshingiz <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="age"
                      required
                      min="18"
                      max="80"
                      placeholder="Eng kam yosh: 18"
                      className="w-full bg-[#121B3A] border border-blue-900/30 rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
                      Sizning jinsingiz <span className="text-rose-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <div
                        onClick={() => setSelectedGender("Erkak")}
                        className={`p-4 rounded-xl border cursor-pointer flex items-center justify-between transition-all duration-300 ${
                          selectedGender === "Erkak"
                            ? "bg-blue-600/10 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.15)] text-blue-400"
                            : "bg-[#121B3A] border-blue-900/30 text-slate-400"
                        }`}
                      >
                        <span className="text-xs font-bold">♂️ Erkak</span>
                        {selectedGender === "Erkak" && (
                          <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white scale-100 transition-all">
                            <Check className="w-3.5 h-3.5 stroke-[3px]" />
                          </div>
                        )}
                      </div>

                      <div
                        onClick={() => setSelectedGender("Ayol")}
                        className={`p-4 rounded-xl border cursor-pointer flex items-center justify-between transition-all duration-300 ${
                          selectedGender === "Ayol"
                            ? "bg-pink-600/10 border-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.15)] text-pink-400"
                            : "bg-[#121B3A] border-blue-900/30 text-slate-400"
                        }`}
                      >
                        <span className="text-xs font-bold">
                          ♀️ Ayol (Qizbola)
                        </span>
                        {selectedGender === "Ayol" && (
                          <div className="w-5 h-5 rounded-full bg-pink-500 flex items-center justify-center text-white scale-100 transition-all">
                            <Check className="w-3.5 h-3.5 stroke-[3px]" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">
                      Shahar / Viloyat
                    </label>
                    <select
                      name="city"
                      className="w-full bg-[#121B3A] border border-blue-900/30 rounded-xl px-4 py-3.5 text-xs text-white"
                    >
                      {UZBEK_CITIES.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">
                      O'zingiz haqingizda (Bio)
                    </label>
                    <textarea
                      name="bio"
                      rows="2"
                      placeholder="Qisqacha ta'rif..."
                      className="w-full bg-[#121B3A] border border-blue-900/30 rounded-xl px-4 py-3 text-xs text-white resize-none"
                    ></textarea>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-4 bg-gradient-to-r from-pink-500 via-rose-500 to-indigo-600 hover:brightness-110 text-white font-extrabold rounded-2xl text-xs uppercase tracking-wider shadow-lg active:scale-95 transition-all"
                    >
                      Hisobni tasdiqlash
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Discovery / Swipe Screen */}
          {currentTab === "discovery" && (
            <div className="p-4 flex-1 flex flex-col justify-between overflow-hidden">
              <div
                className={`${currentStyle.card} p-3 rounded-2xl space-y-2.5 shrink-0`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black flex items-center gap-1.5 uppercase tracking-wider">
                    <Filter className="w-3.5 h-3.5 text-pink-500" /> Filtrlar
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[9px] text-slate-400 font-bold uppercase">
                      Hudud
                    </label>
                    <select
                      value={cityFilter}
                      onChange={(e) => setCityFilter(e.target.value)}
                      className="w-full bg-slate-900/50 border border-pink-500/10 rounded-lg px-2 py-1 text-[11px] text-white focus:outline-none"
                    >
                      <option value="Hammasi">O'zbekiston bo'ylab</option>
                      {UZBEK_CITIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <label className="text-[9px] text-slate-400 font-bold uppercase">
                        Yosh chegarasi
                      </label>
                      <span className="text-[9px] text-pink-500 font-bold">
                        {ageRange[1]} yoshgacha
                      </span>
                    </div>
                    <input
                      type="range"
                      min="18"
                      max="50"
                      value={ageRange[1]}
                      onChange={(e) =>
                        setAgeRange([18, parseInt(e.target.value)])
                      }
                      className="w-full accent-pink-500 h-1 bg-slate-700 mt-2"
                    />
                  </div>
                </div>
              </div>

              {/* Swipe Card container */}
              <div className="flex-1 flex flex-col justify-center my-3 relative overflow-hidden">
                {activeProfile ? (
                  <div className="relative w-full h-full max-h-[460px] aspect-[3/4] rounded-[24px] overflow-hidden border border-pink-500/25 shadow-2xl flex flex-col justify-end">
                    <img
                      src={activeProfile.avatar}
                      alt={activeProfile.name}
                      className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>

                    {activeProfile.isOnline && (
                      <span className="absolute top-4 left-4 bg-emerald-500/20 border border-emerald-500 text-emerald-400 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-lg backdrop-blur-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>{" "}
                        Onlayn
                      </span>
                    )}

                    <div className="relative p-5 space-y-2 z-10">
                      <div className="flex items-center gap-2">
                        <h4 className="text-xl font-black text-white">
                          {activeProfile.name}, {activeProfile.age}
                        </h4>
                        {activeProfile.verified && (
                          <span className="bg-blue-500 text-white p-0.5 rounded-full">
                            <Check className="w-3 h-3 stroke-[3px]" />
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-pink-400 font-bold tracking-wider uppercase">
                        {activeProfile.city} viloyati
                      </p>
                      <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                        {activeProfile.bio}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-10 px-6 bg-slate-900/40 border border-pink-500/10 rounded-3xl space-y-4">
                    <Compass className="w-10 h-10 text-slate-500 mx-auto animate-spin" />
                    <h4 className="font-bold text-white text-sm">
                      Mos keladigan a'zolar qolmadi
                    </h4>
                    <button
                      onClick={() => {
                        setCityFilter("Hammasi");
                        setLikedProfiles([]);
                        setDislikedProfiles([]);
                      }}
                      className="px-4 py-2 bg-pink-600 hover:bg-pink-500 text-white text-[11px] font-bold rounded-xl transition-all uppercase"
                    >
                      Qayta izlash
                    </button>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              {activeProfile && (
                <div className="flex items-center justify-center gap-5 shrink-0 py-2">
                  <button
                    onClick={() => handleDislike(activeProfile)}
                    className="w-14 h-14 rounded-full bg-slate-900 border border-rose-500/20 hover:border-rose-500 flex items-center justify-center text-rose-500 shadow-xl active:scale-90 transition-all"
                  >
                    <X className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => handleLike(activeProfile)}
                    className="w-14 h-14 rounded-full bg-gradient-to-tr from-pink-500 to-rose-500 hover:brightness-110 flex items-center justify-center text-white shadow-xl active:scale-90 transition-all"
                  >
                    <Heart className="w-6 h-6 fill-white" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Chats Screen */}
          {currentTab === "chats" && (
            <div className="flex-1 flex flex-col bg-gradient-to-b from-[#0A0F24] to-[#121B3A] overflow-hidden">
              {!activeChatId ? (
                <div className="p-4 space-y-4 flex-1 overflow-y-auto">
                  <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                    <MessageCircle className="w-5 h-5 text-pink-500" />{" "}
                    Suhbatlar
                  </h3>

                  <div className="space-y-2">
                    {chats.map((chat) => {
                      const matchedProfile = profiles.find(
                        (p) => p.id === chat.profileId,
                      );
                      if (!matchedProfile) return null;
                      const lastMsg = chat.messages[chat.messages.length - 1];

                      return (
                        <div
                          key={chat.id}
                          onClick={() => setActiveChatId(chat.id)}
                          className="bg-slate-900/60 border border-pink-500/10 p-3 rounded-2xl flex items-center gap-3 cursor-pointer hover:border-pink-500/30 hover:bg-slate-900/30 transition-all"
                        >
                          <div className="relative">
                            <img
                              src={matchedProfile.avatar}
                              alt={matchedProfile.name}
                              className="w-11 h-11 rounded-xl object-cover"
                            />
                            {matchedProfile.isOnline && (
                              <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-slate-950 rounded-full"></span>
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-bold text-xs text-white">
                                {matchedProfile.name}
                              </h4>
                              <span className="text-[9px] text-slate-500">
                                {lastMsg?.timestamp}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-400 truncate">
                              {lastMsg
                                ? (lastMsg.sender === "you" ? "Siz: " : "") +
                                  lastMsg.text
                                : "Multimedia xabar"}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                (() => {
                  const activeChat = chats.find((c) => c.id === activeChatId);
                  const matchedProfile = profiles.find(
                    (p) => p.id === activeChat?.profileId,
                  );
                  if (!activeChat || !matchedProfile) return null;

                  return (
                    <div className="flex-1 flex flex-col justify-between overflow-hidden relative">
                      {/* Active Chat Wallpaper Theme Applied */}
                      <div
                        className={`absolute inset-0 z-0 ${chatWallpapers[activeChat.wallpaperTheme || "sevgi"]}`}
                      ></div>

                      {/* Chat Header */}
                      <div className="bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 px-4 py-3 flex items-center justify-between shrink-0 z-10">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => setActiveChatId(null)}
                            className="p-1 text-slate-400 hover:text-white mr-1"
                          >
                            <X className="w-5 h-5" />
                          </button>
                          <div className="relative">
                            <img
                              src={matchedProfile.avatar}
                              alt={matchedProfile.name}
                              className="w-9 h-9 rounded-xl object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-bold text-xs text-white">
                              {matchedProfile.name}
                            </h4>
                            <p className="text-[9px] text-pink-400 uppercase tracking-wider font-bold">
                              Faol muloqot
                            </p>
                          </div>
                        </div>

                        {/* Theme Wallpapers Selector & Video call in Chat */}
                        <div className="flex items-center gap-1.5">
                          {/* Chat-specific theme selector */}
                          <div className="flex bg-slate-900/60 p-1 rounded-xl gap-1 border border-slate-800">
                            <button
                              onClick={() =>
                                handleChatThemeChange(activeChat.id, "sevgi")
                              }
                              className={`p-1.5 rounded-lg ${activeChat.wallpaperTheme === "sevgi" ? "bg-pink-500 text-white" : "text-slate-400 hover:text-white"}`}
                              title="Romantika"
                            >
                              <Heart className="w-3.5 h-3.5 fill-current" />
                            </button>
                            <button
                              onClick={() =>
                                handleChatThemeChange(activeChat.id, "anime")
                              }
                              className={`p-1.5 rounded-lg ${activeChat.wallpaperTheme === "anime" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"}`}
                              title="Anime"
                            >
                              <Sparkles className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() =>
                                handleChatThemeChange(activeChat.id, "multik")
                              }
                              className={`p-1.5 rounded-lg ${activeChat.wallpaperTheme === "multik" ? "bg-amber-500 text-slate-950" : "text-slate-400 hover:text-white"}`}
                              title="Multik"
                            >
                              <Smile className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() =>
                                handleChatThemeChange(activeChat.id, "kino")
                              }
                              className={`p-1.5 rounded-lg ${activeChat.wallpaperTheme === "kino" ? "bg-slate-700 text-white" : "text-slate-400 hover:text-white"}`}
                              title="Kino"
                            >
                              <Film className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <button
                            onClick={() => startVideoCall(matchedProfile)}
                            className="p-2 bg-pink-500/20 hover:bg-pink-500/30 text-pink-400 rounded-xl transition-all"
                            title="Video muloqot"
                          >
                            <Video className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* QUICK MEDIA REQUEST CHIPS */}
                      <div className="px-3 py-2 bg-slate-900/90 backdrop-blur-sm border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto custom-scrollbar shrink-0 z-10">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider shrink-0">
                          Siz so'rang:
                        </span>
                        <button
                          onClick={() =>
                            triggerPartnerReply(
                              matchedProfile.id,
                              "Menga rasmingizni yuboring!",
                              "photo",
                            )
                          }
                          className="px-2.5 py-1 bg-pink-500/10 hover:bg-pink-500/20 border border-pink-500/25 text-pink-400 text-[10px] font-bold rounded-lg flex items-center gap-1 shrink-0"
                        >
                          <Image className="w-3.5 h-3.5" /> Rasm 📷
                        </button>
                        <button
                          onClick={() =>
                            triggerPartnerReply(
                              matchedProfile.id,
                              "Ovozli xabar yuboring!",
                              "voice",
                            )
                          }
                          className="px-2.5 py-1 bg-pink-500/10 hover:bg-pink-500/20 border border-pink-500/25 text-pink-400 text-[10px] font-bold rounded-lg flex items-center gap-1 shrink-0"
                        >
                          <Mic className="w-3.5 h-3.5" /> Ovozli 🎤
                        </button>
                        <button
                          onClick={() =>
                            triggerPartnerReply(
                              matchedProfile.id,
                              "Video krujok yuboring!",
                              "video",
                            )
                          }
                          className="px-2.5 py-1 bg-pink-500/10 hover:bg-pink-500/20 border border-pink-500/25 text-pink-400 text-[10px] font-bold rounded-lg flex items-center gap-1 shrink-0"
                        >
                          <Video className="w-3.5 h-3.5" /> Video 📹
                        </button>
                      </div>

                      {/* Message Thread */}
                      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 flex flex-col justify-end z-10">
                        {activeChat.messages.map((msg, i) => (
                          <div
                            key={i}
                            className={`flex flex-col max-w-[85%] ${msg.sender === "you" ? "self-end items-end" : "self-start items-start"}`}
                          >
                            <div
                              className={`p-3 rounded-2xl text-[11px] leading-relaxed relative ${
                                msg.sender === "you"
                                  ? "bg-pink-600 text-white rounded-br-none shadow-md shadow-pink-600/10"
                                  : "bg-slate-900/90 text-slate-100 rounded-bl-none border border-slate-800"
                              }`}
                            >
                              {/* Photo layout */}
                              {msg.type === "photo" && (
                                <div className="space-y-2 mb-1">
                                  <img
                                    src={msg.mediaUrl}
                                    alt="Media"
                                    onClick={() => {
                                      setPreviewMediaUrl(msg.mediaUrl);
                                      setPreviewMediaType("image");
                                    }}
                                    className="max-w-full rounded-xl cursor-pointer hover:opacity-90 max-h-40 object-cover"
                                  />
                                  <p>{msg.text}</p>
                                </div>
                              )}

                              {/* Video layout (krujok) */}
                              {msg.type === "video" && (
                                <div className="space-y-2 mb-1">
                                  <div className="relative w-40 rounded-full overflow-hidden aspect-square bg-slate-900 border-2 border-pink-500 shadow-lg flex items-center justify-center">
                                    <video
                                      src={msg.mediaUrl}
                                      className="w-full h-full object-cover"
                                      controls={false}
                                      autoPlay
                                      loop
                                      muted
                                      playsInline
                                    />
                                    <button
                                      onClick={() => {
                                        setPreviewMediaUrl(msg.mediaUrl);
                                        setPreviewMediaType("video");
                                      }}
                                      className="absolute inset-0 bg-black/10 hover:bg-black/30 flex items-center justify-center transition-all opacity-0 hover:opacity-100"
                                    >
                                      <Play className="w-5 h-5 text-white fill-white" />
                                    </button>
                                  </div>
                                  <p className="text-[10px] mt-1 font-semibold">
                                    {msg.text}
                                  </p>
                                </div>
                              )}

                              {/* Voice player */}
                              {msg.type === "voice" && (
                                <div className="flex items-center gap-3.5 py-1 px-1.5 w-52">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      if (msg.mediaUrl === "speech_synth") {
                                        playSpeechSynthesis(
                                          msg.text,
                                          matchedProfile.voiceAccent,
                                          i,
                                        );
                                      } else {
                                        const audio = new Audio(msg.mediaUrl);
                                        audio.play();
                                        setPlayingMessageId(i);
                                        audio.onended = () =>
                                          setPlayingMessageId(null);
                                      }
                                    }}
                                    className="w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400 shrink-0 hover:bg-pink-500/40"
                                  >
                                    {playingMessageId === i ? (
                                      <Pause className="w-4 h-4 fill-pink-400" />
                                    ) : (
                                      <Play className="w-4 h-4 fill-pink-400" />
                                    )}
                                  </button>
                                  <div className="flex-1 space-y-1">
                                    <div className="flex items-end gap-[2px] h-6 py-1">
                                      {[...Array(14)].map((_, wIdx) => {
                                        const isPlaying =
                                          playingMessageId === i;
                                        const barHeight = isPlaying
                                          ? VOICE_WAVEFORM_BARS[wIdx]
                                          : 25;
                                        return (
                                          <span
                                            key={wIdx}
                                            className={`flex-1 bg-pink-400 rounded-sm ${isPlaying ? "transition-all duration-300" : ""}`}
                                            style={{
                                              height: `${barHeight}%`,
                                            }}
                                          ></span>
                                        );
                                      })}
                                    </div>
                                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                                      Ovozli xabar
                                    </p>
                                  </div>
                                </div>
                              )}

                              {/* Simple Text layout */}
                              {(!msg.type || msg.type === "text") && (
                                <p>{msg.text}</p>
                              )}
                            </div>
                            <span className="text-[8px] text-slate-400/80 mt-1 px-1">
                              {msg.timestamp}
                            </span>
                          </div>
                        ))}

                        {isTyping && (
                          <div className="self-start flex items-center gap-1 bg-slate-950/80 p-2 rounded-xl text-slate-400 border border-slate-800">
                            <span className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-bounce"></span>
                            <span className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-bounce delay-100"></span>
                            <span className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-bounce delay-200"></span>
                          </div>
                        )}
                      </div>

                      {/* Chat Input form */}
                      <div className="p-3 bg-slate-950/80 backdrop-blur-md border-t border-slate-800/80 shrink-0 z-10">
                        {isRecording && (
                          <div className="flex items-center justify-between p-3 bg-rose-600/10 border border-rose-500/30 rounded-xl mb-2 animate-pulse">
                            <div className="flex items-center gap-2">
                              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
                              <span className="text-rose-400 text-xs font-bold font-mono">
                                Xabar yozilmoqda...{" "}
                                {formatDuration(recordingTime)}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={stopVoiceRecording}
                              className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-[10px] font-black uppercase tracking-wider"
                            >
                              Yuborish
                            </button>
                          </div>
                        )}

                        <form
                          onSubmit={handleSendMessage}
                          className="flex items-center gap-2"
                        >
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => {
                                const randomPhoto =
                                  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=600";
                                setChats((prevChats) =>
                                  prevChats.map((c) => {
                                    if (c.id === activeChatId) {
                                      return {
                                        ...c,
                                        messages: [
                                          ...c.messages,
                                          {
                                            sender: "you",
                                            text: "Men ham rasm yukladim! 😉",
                                            timestamp: "Hozir",
                                            type: "photo",
                                            mediaUrl: randomPhoto,
                                          },
                                        ],
                                      };
                                    }
                                    return c;
                                  }),
                                );
                                showToast("Rasm yuborildi!");
                              }}
                              className="p-3 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white rounded-xl"
                              title="Rasm yuklash"
                            >
                              <Image className="w-4 h-4" />
                            </button>

                            <button
                              type="button"
                              onClick={
                                isRecording
                                  ? stopVoiceRecording
                                  : startVoiceRecording
                              }
                              className={`p-3 border text-white rounded-xl ${isRecording ? "bg-rose-600 border-rose-500 animate-pulse" : "bg-slate-900 border-slate-800 hover:text-pink-400"}`}
                              title="Ovozli yozish"
                            >
                              <Mic className="w-4 h-4" />
                            </button>
                          </div>

                          <input
                            type="text"
                            value={currentMessage}
                            onChange={(e) => setCurrentMessage(e.target.value)}
                            placeholder={
                              isRecording
                                ? "Ovozli yozilmoqda..."
                                : "Xabaringiz..."
                            }
                            disabled={isRecording}
                            className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-3 text-xs text-white focus:outline-none focus:border-pink-500 disabled:opacity-40"
                          />

                          <button
                            type="submit"
                            className="p-3 bg-pink-600 hover:bg-pink-500 text-white rounded-xl shadow-md"
                          >
                            <Send className="w-4 h-4" />
                          </button>
                        </form>
                      </div>
                    </div>
                  );
                })()
              )}
            </div>
          )}

          {/* Guests / Visitors list */}
          {currentTab === "guests" && (
            <div className="p-4 space-y-4 flex-1 overflow-y-auto">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                  <Eye className="w-5 h-5 text-pink-500" /> Profil Mehmonlari
                </h3>
                <span className="text-[10px] bg-amber-500/10 text-amber-400 font-bold px-2 py-0.5 rounded-full border border-amber-500/20 flex items-center gap-1">
                  <Lock className="w-3 h-3" /> VIP GOLD
                </span>
              </div>

              <div className="relative">
                <div
                  className={`space-y-2.5 ${!currentUser || !currentUser.isPremium ? "blur-md pointer-events-none select-none" : ""}`}
                >
                  {INITIAL_GUESTS.map((guest, i) => {
                    const profile = profiles.find(
                      (p) => p.id === guest.profileId,
                    );
                    if (!profile) return null;

                    return (
                      <div
                        key={i}
                        className="bg-slate-900 border border-slate-800 p-3.5 rounded-2xl flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={profile.avatar}
                            alt={profile.name}
                            className="w-10 h-10 rounded-xl object-cover"
                          />
                          <div>
                            <h4 className="font-bold text-xs text-white">
                              {profile.name}, {profile.age}
                            </h4>
                            <p className="text-[9px] text-slate-400 uppercase tracking-wider">
                              {profile.city}
                            </p>
                          </div>
                        </div>
                        <span className="text-[9px] text-slate-500">
                          {guest.time}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {(!currentUser || !currentUser.isPremium) && (
                  <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-md rounded-2xl flex flex-col items-center justify-center text-center p-6 border border-amber-500/20">
                    <Award className="w-12 h-12 text-amber-400 mb-3 animate-pulse" />
                    <h4 className="font-black text-sm text-white uppercase tracking-wider">
                      Mehmonlarni ko'rish
                    </h4>
                    <p className="text-xs text-slate-400 mt-2 mb-4 px-3">
                      Profilingizni kimlar kuzatganligini ko'rish uchun VIP
                      obunaga ulanishingiz kerak.
                    </p>
                    <button
                      onClick={() => setVipModalOpen(true)}
                      className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-black text-[11px] uppercase tracking-wider rounded-xl"
                    >
                      VIP ulanish
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Profile Cabinet */}
          {currentTab === "profile" && (
            <div className="p-4 space-y-5 flex-1 overflow-y-auto">
              <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                <User className="w-5 h-5 text-pink-500" /> Shaxsiy kabinet
              </h3>

              {currentUser ? (
                isEditingProfile ? (
                  <form
                    onSubmit={handleSaveProfile}
                    className="space-y-4 bg-slate-900 border border-slate-800 p-5 rounded-2xl text-left"
                  >
                    <h4 className="text-xs font-black uppercase tracking-wider text-pink-400">
                      Profil ma'lumotlarini tahrirlash
                    </h4>

                    <div className="flex items-center gap-3">
                      <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-pink-500">
                        <img
                          src={editAvatarPreview || currentUser.avatar}
                          alt="avatar-preview"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">
                          Profil rasmi
                        </label>
                        <div className="flex gap-2">
                          <label className="px-3 py-2 bg-slate-800 rounded-xl text-xs cursor-pointer flex items-center gap-2">
                            Fayl tanlash
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleAvatarSelect}
                              className="hidden"
                            />
                          </label>
                          <button
                            type="button"
                            onClick={() => {
                              setEditAvatarFile(null);
                              setEditAvatarPreview(null);
                            }}
                            className="px-3 py-2 bg-rose-600 text-white rounded-xl text-xs"
                          >
                            O'chirish
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">
                        Ism
                      </label>
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        required
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-3 text-xs text-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">
                        Yosh
                      </label>
                      <input
                        type="number"
                        value={editAge}
                        onChange={(e) => setEditAge(e.target.value)}
                        required
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-3 text-xs text-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">
                        Yashash joyi
                      </label>
                      <select
                        value={editCity}
                        onChange={(e) => setEditCity(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-3 text-xs text-white"
                      >
                        {UZBEK_CITIES.map((city) => (
                          <option key={city} value={city}>
                            {city}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">
                        Bio (Status)
                      </label>
                      <textarea
                        value={editBio}
                        onChange={(e) => setEditBio(e.target.value)}
                        rows="3"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-3 text-xs text-white resize-none"
                      ></textarea>
                    </div>

                    <div className="flex gap-2.5 pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setIsEditingProfile(false);
                          setEditAvatarFile(null);
                          setEditAvatarPreview(null);
                        }}
                        className="flex-1 py-3 bg-slate-800 text-slate-300 text-xs font-bold rounded-xl"
                      >
                        Bekor qilish
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold rounded-xl"
                      >
                        Saqlash
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex flex-col items-center text-center relative overflow-hidden">
                      <img
                        src={currentUser.avatar}
                        alt={currentUser.name}
                        className="w-20 h-20 rounded-full border-2 border-pink-500 object-cover p-0.5 mb-3"
                      />
                      <h4 className="font-bold text-sm text-white flex items-center gap-1">
                        {currentUser.name}, {currentUser.age}
                        <Check className="w-4 h-4 bg-pink-500 text-white rounded-full p-0.5" />
                      </h4>
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider">
                        {currentUser.city} viloyati
                      </p>

                      <div className="mt-4 bg-slate-950 p-3 rounded-xl border border-slate-800 w-full text-left">
                        <p className="text-[9px] text-slate-500 uppercase font-black mb-1">
                          Mening statusim
                        </p>
                        <p className="text-xs text-slate-300 italic">
                          "{currentUser.bio}"
                        </p>
                      </div>

                      <button
                        onClick={handleStartEdit}
                        className="mt-4 w-full py-2.5 bg-slate-800 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 border border-slate-700"
                      >
                        <SlidersHorizontal className="w-3.5 h-3.5 text-pink-400" />{" "}
                        Profilni tahrirlash
                      </button>
                    </div>

                    <button
                      onClick={() => {
                        setCurrentUser(null);
                        setCurrentTab("welcome");
                      }}
                      className="w-full py-3.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-extrabold rounded-2xl flex items-center justify-center gap-2"
                    >
                      <LogOut className="w-4 h-4" /> Tizimdan chiqish
                    </button>
                  </div>
                )
              ) : null}
            </div>
          )}

          {/* Admin Control Center */}
          {currentTab === "admin" && (
            <div className="p-4 space-y-4 flex-1 overflow-y-auto">
              {!isAdmin ? (
                <div className="rounded-3xl border border-rose-500/40 bg-slate-950/80 p-6 text-center text-slate-300">
                  <ShieldAlert className="mx-auto mb-4 w-10 h-10 text-rose-500" />
                  <h3 className="text-base font-black text-white mb-2">
                    Sizda admin huquqlari yo'q
                  </h3>
                  <p className="text-xs text-slate-400 mb-4">
                    Faqat CEO hisobiga ega foydalanuvchilar bu sahifaga kirishi
                    mumkin.
                  </p>
                  <button
                    onClick={() => setCurrentTab("discovery")}
                    className="px-4 py-3 bg-pink-600 text-white rounded-2xl text-xs font-bold hover:bg-pink-500"
                  >
                    Bosh sahifaga qaytish
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-black text-white flex items-center gap-1.5">
                      <ShieldAlert className="w-5 h-5 text-rose-500" />
                      Moderatsiya markazi
                    </h3>
                  </div>

                  <div className="bg-slate-900 p-1.5 rounded-xl flex gap-1.5 shrink-0 text-center">
                    <button
                      onClick={() => setAdminView("dashboard")}
                      className={`flex-1 py-2 text-[10px] font-bold rounded-lg ${adminView === "dashboard" ? "bg-pink-600 text-white" : "text-slate-400"}`}
                    >
                      Statistika
                    </button>
                    <button
                      onClick={() => setAdminView("users")}
                      className={`flex-1 py-2 text-[10px] font-bold rounded-lg ${adminView === "users" ? "bg-pink-600 text-white" : "text-slate-400"}`}
                    >
                      A'zolar
                    </button>
                    <button
                      onClick={() => setAdminView("reports")}
                      className={`flex-1 py-2 text-[10px] font-bold rounded-lg ${adminView === "reports" ? "bg-pink-600 text-white" : "text-slate-400"}`}
                    >
                      Shikoyatlar
                    </button>
                  </div>

                  {adminView === "dashboard" && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-2xl">
                          <p className="text-[10px] text-slate-400 font-bold uppercase">
                            Jami ro'yxatdagilar
                          </p>
                          <p className="text-xl font-black text-white mt-1">
                            {persistedUsers.length} ta
                          </p>
                        </div>
                        <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-2xl">
                          <p className="text-[10px] text-slate-400 font-bold uppercase">
                            Shikoyatlar
                          </p>
                          <p className="text-xl font-black text-rose-500 mt-1">
                            {reports.length} ta
                          </p>
                        </div>
                      </div>

                      <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-2xl space-y-2">
                        <p className="text-[10px] text-slate-400 font-bold uppercase">
                          Tizim jurnali
                        </p>
                        {systemLogs.map((log) => (
                          <div
                            key={log.id}
                            className="flex items-start justify-between gap-3 border-t border-slate-800 pt-2 first:border-t-0 first:pt-0"
                          >
                            <p
                              className={`text-[10px] font-semibold ${
                                log.type === "success"
                                  ? "text-emerald-400"
                                  : "text-slate-300"
                              }`}
                            >
                              {log.text}
                            </p>
                            <span className="text-[9px] text-slate-500 font-mono shrink-0">
                              {log.time}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {adminView === "users" && (
                    <div className="space-y-2">
                      {persistedUsers.length === 0 ? (
                        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl text-slate-400 text-xs text-center">
                          Hozircha hech qanday ro'yxatdan o'tgan foydalanuvchi
                          yo'q.
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {persistedUsers.map((p) => (
                            <div
                              key={p.id}
                              className="bg-slate-900 border border-slate-800 p-2.5 rounded-xl flex items-center justify-between"
                            >
                              <div className="flex items-center gap-2">
                                <img
                                  src={p.avatar}
                                  alt={p.name}
                                  className="w-8 h-8 rounded-full object-cover"
                                />
                                <div>
                                  <h4 className="text-xs font-bold text-white">
                                    {p.name}, {p.age}
                                  </h4>
                                  <p className="text-[9px] text-slate-400">
                                    {p.city}
                                  </p>
                                </div>
                              </div>
                              <div className="flex gap-1.5">
                                <button
                                  onClick={() => handleToggleVerify(p.id)}
                                  className={`px-2 py-1 text-[9px] rounded ${p.verified ? "bg-pink-600 text-white" : "bg-slate-800"}`}
                                >
                                  Tasdiqlash
                                </button>
                                <button
                                  onClick={() => handleBanUser(p.id)}
                                  className="px-2 py-1 text-[9px] bg-rose-600 text-white rounded"
                                >
                                  Blok
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {adminView === "reports" && (
                    <div className="space-y-2">
                      {reports.map((report) => (
                        <div
                          key={report.id}
                          className="bg-slate-900 border border-slate-800 p-3 rounded-xl space-y-2 text-left"
                        >
                          <p className="text-[10px] text-rose-400 font-bold font-sans">
                            Shikoyatchi: {report.reporter}
                          </p>
                          <p className="text-xs text-white font-sans">
                            Kim haqida: {report.reportedUser}
                          </p>
                          <p className="text-xs text-slate-400 bg-slate-950 p-2 rounded">
                            Sabab: {report.reason}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Global Footer Navigation */}
        {currentTab !== "welcome" &&
          currentTab !== "register" &&
          currentTab !== "login" && (
            <div
              className={`${currentStyle.tabBar} grid grid-cols-5 p-2 z-20 shrink-0`}
            >
              <button
                onClick={() => {
                  setCurrentTab("discovery");
                  setActiveChatId(null);
                }}
                className={`flex flex-col items-center justify-center p-2 rounded-xl ${currentTab === "discovery" ? currentStyle.tabActive : "text-slate-400"}`}
              >
                <Compass className="w-5 h-5 mb-1" />
                <span className="text-[9px] font-bold">Izlash</span>
              </button>

              <button
                onClick={() => setCurrentTab("chats")}
                className={`flex flex-col items-center justify-center p-2 rounded-xl relative ${currentTab === "chats" ? currentStyle.tabActive : "text-slate-400"}`}
              >
                <MessageCircle className="w-5 h-5 mb-1" />
                <span className="text-[9px] font-bold">Chatlar</span>
                <span className="absolute top-1.5 right-4 w-2 h-2 rounded-full bg-pink-500 animate-pulse"></span>
              </button>

              <button
                onClick={() => setVipModalOpen(true)}
                className="flex flex-col items-center justify-center -mt-4 bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 rounded-full w-12 h-12 mx-auto shadow-xl border-4 border-slate-900"
              >
                <Award className="w-6 h-6" />
              </button>

              <button
                onClick={() => {
                  setCurrentTab("guests");
                  setActiveChatId(null);
                }}
                className={`flex flex-col items-center justify-center p-2 rounded-xl ${currentTab === "guests" ? currentStyle.tabActive : "text-slate-400"}`}
              >
                <Eye className="w-5 h-5 mb-1" />
                <span className="text-[9px] font-bold">Mehmonlar</span>
              </button>

              <button
                onClick={() => {
                  setCurrentTab("profile");
                  setActiveChatId(null);
                }}
                className={`flex flex-col items-center justify-center p-2 rounded-xl ${currentTab === "profile" ? currentStyle.tabActive : "text-slate-400"}`}
              >
                <User className="w-5 h-5 mb-1" />
                <span className="text-[9px] font-bold">Kabinet</span>
              </button>
            </div>
          )}

        {/* Multimedia Lightbox Preview */}
        {previewMediaUrl && (
          <div className="absolute inset-0 bg-black/95 z-55 flex flex-col justify-between p-4">
            <div className="flex justify-end pt-2">
              <button
                onClick={() => {
                  setPreviewMediaUrl(null);
                  setPreviewMediaType(null);
                }}
                className="p-2 bg-slate-800 hover:bg-slate-700 text-white rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 flex items-center justify-center p-2">
              {previewMediaType === "image" ? (
                <img
                  src={previewMediaUrl}
                  alt="Preview"
                  className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl border border-slate-800"
                />
              ) : (
                <video
                  src={previewMediaUrl}
                  controls
                  autoPlay
                  className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl"
                />
              )}
            </div>

            <div className="text-center pb-4 text-xs text-slate-400 font-semibold uppercase tracking-wider">
              ZNAKOMSTVA.uz Premium Galereya
            </div>
          </div>
        )}

        {/* Video Call Simulation Frame */}
        {videoCallActive && videoCallProfile && (
          <div className="absolute inset-0 bg-slate-950 z-50 flex flex-col justify-between p-6">
            <div className="flex items-center justify-between text-center mt-4">
              <div className="text-left">
                <span className="bg-red-500/10 border border-red-500/30 text-red-500 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Muloqot ulanishi
                </span>
                <h3 className="text-xl font-black text-white mt-1.5">
                  {videoCallProfile.name}
                </h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  {formatDuration(callDuration)}
                </p>
              </div>

              <div className="w-12 h-12 rounded-xl overflow-hidden border border-slate-800">
                <img
                  src={videoCallProfile.avatar}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="flex-1 my-6 relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 flex items-center justify-center shadow-inner">
              <video
                src={
                  videoCallProfile.sampleVideos[0] ||
                  "https://assets.mixkit.co/videos/preview/mixkit-young-woman-smiling-at-camera-41551-large.mp4"
                }
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover absolute inset-0"
              />

              <div className="absolute bottom-4 right-4 w-28 aspect-[3/4] bg-black border border-white/25 rounded-2xl overflow-hidden shadow-2xl z-10">
                <video
                  ref={userVideoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover scale-x-[-1]"
                />
              </div>

              <div className="absolute top-4 left-4 p-2 bg-black/40 backdrop-blur-sm rounded-xl text-white text-[9px] uppercase tracking-wider font-bold">
                HD video muloqot faol
              </div>
            </div>

            <div className="flex items-center justify-center gap-6 mb-4">
              <button
                onClick={endVideoCall}
                className="w-16 h-16 rounded-full bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center shadow-xl hover:shadow-rose-600/20 active:scale-95 transition-all"
              >
                <PhoneOff className="w-7 h-7" />
              </button>
            </div>
          </div>
        )}

        {/* Match Screen Overlay */}
        {matchOverlay && (
          <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-md z-45 flex flex-col justify-between p-6 text-center animate-fade-in">
            <div className="my-auto space-y-6">
              <div className="relative inline-block mx-auto text-pink-500 text-xs font-black tracking-widest bg-pink-500/10 px-4 py-1.5 rounded-full border border-pink-500/20 uppercase">
                Yangi Juftlik Topildi!
              </div>

              <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-400 to-indigo-400">
                O'ZARO MOS KELISHDINGIZ! 🎉
              </h2>

              <div className="flex items-center justify-center -space-x-5 py-6">
                <div className="w-22 h-22 rounded-full border-4 border-indigo-500 overflow-hidden shadow-2xl relative z-10 transform -rotate-12">
                  <img
                    src={
                      currentUser?.avatar ||
                      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=600"
                    }
                    alt="You"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-10 h-10 bg-gradient-to-tr from-pink-500 to-purple-600 text-white rounded-full flex items-center justify-center shadow-lg relative z-20">
                  <Heart className="w-5 h-5 fill-white animate-pulse" />
                </div>
                <div className="w-22 h-22 rounded-full border-4 border-pink-500 overflow-hidden shadow-2xl relative z-10 transform rotate-12">
                  <img
                    src={matchOverlay.avatar}
                    alt={matchOverlay.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-xs text-slate-300">
                  Siz va{" "}
                  <strong className="text-white font-extrabold">
                    {matchOverlay.name}
                  </strong>{" "}
                  bir-biringizga yoqdingiz!
                </p>
                <p className="text-[10px] text-slate-400">
                  Suhbatni darhol boshlash uchun xabar yozing!
                </p>
              </div>
            </div>

            <div className="space-y-2.5">
              <button
                onClick={() => {
                  const chat = chats.find(
                    (c) => c.profileId === matchOverlay.id,
                  );
                  if (chat) {
                    setActiveChatId(chat.id);
                  }
                  setCurrentTab("chats");
                  setMatchOverlay(null);
                }}
                className="w-full py-3.5 bg-gradient-to-r from-pink-500 to-indigo-600 hover:brightness-110 text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 text-xs uppercase"
              >
                Xabar yozish <Send className="w-4 h-4" />
              </button>
              <button
                onClick={() => setMatchOverlay(null)}
                className="w-full py-3 bg-slate-900 text-slate-300 font-bold rounded-xl text-xs"
              >
                Tanishuvni davom ettirish
              </button>
            </div>
          </div>
        )}

        {/* VIP modal Frame */}
        {vipModalOpen && (
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md z-50 flex flex-col justify-end">
            <div className="bg-slate-900 border-t border-slate-800 rounded-t-[32px] p-6 space-y-5 animate-slide-up">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award className="w-6 h-6 text-amber-400" />
                  <h3 className="text-sm font-black text-white uppercase tracking-wider">
                    ZNAKOMSTVA.uz VIP GOLD
                  </h3>
                </div>
                <button
                  onClick={() => setVipModalOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-full"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                VIP Premium maqomiga ulanib, platformadagi eng yuqori darajadagi
                maxfiylik va muloqot imkoniyatlariga ega bo'ling.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div
                  onClick={() => {
                    setCurrentUser((prev) => ({ ...prev, isPremium: true }));
                    setVipModalOpen(false);
                    showToast(
                      "1 oylik VIP GOLD obunasi muvaffaqiyatli ulindi! 🌟",
                    );
                  }}
                  className="bg-slate-950 border border-amber-500/30 p-4 rounded-2xl text-center cursor-pointer hover:bg-amber-500/5"
                >
                  <p className="text-[9px] text-amber-400 font-bold mb-1 uppercase tracking-wider">
                    1 Oylik VIP
                  </p>
                  <h4 className="text-sm font-black text-white">29,000 UZS</h4>
                </div>

                <div
                  onClick={() => {
                    setCurrentUser((prev) => ({ ...prev, isPremium: true }));
                    setVipModalOpen(false);
                    showToast(
                      "3 oylik VIP GOLD obunasi muvaffaqiyatli ulindi! 🌟",
                    );
                  }}
                  className="bg-slate-950 border-2 border-amber-400 p-4 rounded-2xl text-center cursor-pointer hover:bg-amber-500/5 relative"
                >
                  <p className="text-[9px] text-amber-400 font-bold mb-1 uppercase tracking-wider">
                    3 Oylik VIP
                  </p>
                  <h4 className="text-sm font-black text-white">59,000 UZS</h4>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
