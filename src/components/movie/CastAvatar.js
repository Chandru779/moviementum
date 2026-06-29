import { useState } from "react";
import { getImageUrl } from "../../helpers/utils";

const getInitials = (name) =>
  name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const CastAvatar = ({ person }) => {
  const [imgFailed, setImgFailed] = useState(false);
  const showPhoto = Boolean(person.profile_path) && !imgFailed;

  return (
    <div className="w-28 md:w-32 h-28 md:h-32 rounded-full overflow-hidden bg-stream-card ring-2 ring-stream-border group-hover:ring-stream-accent transition-all duration-300 mx-auto mb-2">
      {showPhoto ? (
        <img
          src={getImageUrl(person.profile_path, "profile")}
          alt={person.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          loading="lazy"
          onError={() => setImgFailed(true)}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-stream-accent/80 to-purple-900/80">
          <span className="text-2xl md:text-3xl font-bold text-white/90">
            {getInitials(person.name)}
          </span>
        </div>
      )}
    </div>
  );
};

export default CastAvatar;
