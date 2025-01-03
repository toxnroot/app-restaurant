import "./profile.css";

const ProfileDialog = ({ user, onClose, onLogout }) => {
  return (
    <div className="dialog-backdrop" onClick={onClose}>
      <div className="dialog-container" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
        <img
          src={user?.photoURL || "/user.png"}
          alt="Profile"
          className="profile-image"
        />
        <h3 className="profile-name">{user?.displayName || "اسم المستخدم"}</h3>
        <p className="profile-email">{user?.email || "البريد الإلكتروني غير متوفر"}</p>
        <button className="logout-btn" onClick={
          () => {
            onLogout();
            onClose();
          }
        }>
          تسجيل الخروج
        </button>
      </div>
    </div>
  );
};

export default ProfileDialog;
