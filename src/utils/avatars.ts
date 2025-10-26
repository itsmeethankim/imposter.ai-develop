// Avatar images for player selection
import avatar1 from "figma:asset/c2f76c4c069286fde7f5378c7c0a47cbd74fad8a.png";
import avatar2 from "figma:asset/297dfecf5fd235a46a3ea9a2ff5d67d0b32caaa8.png";
import avatar3 from "figma:asset/f58413d1c28e72fe24a92fd94585299303fa101b.png";
import avatar4 from "figma:asset/a61de57e21482d799860e0f5a794ed36038cd166.png";
import avatar5 from "figma:asset/23feede054303a9a16dfb54a81468cd3e1b619a7.png";
import avatar6 from "figma:asset/b55dab5c3f20ed71654757bf093a3676f1c084a9.png";
import avatar7 from "figma:asset/484f835aeb310a91b30d0d552bbebf3dedaf685b.png";
import avatar8 from "figma:asset/6986ab44b4742568f1f6d7835664094f8c9c869a.png";
import avatar9 from "figma:asset/c98b507da933894ce9148962eff1f4db4391e0c2.png";
import avatar10 from "figma:asset/228d0abcec0ec16ca60b1b0e6bab4c50082d19f2.png";
import avatar11 from "figma:asset/18c1b6c6793bdb9f1fd1f0a37060955e1e2cd99e.png";
import avatar12 from "figma:asset/012c6eeb47ef835933c05125151d08390ba0986a.png";

export const AVAILABLE_AVATARS = [
  { id: 'avatar-1', image: avatar1, name: 'Secret Agent 1' },
  { id: 'avatar-2', image: avatar2, name: 'Secret Agent 2' },
  { id: 'avatar-3', image: avatar3, name: 'Detective 1' },
  { id: 'avatar-4', image: avatar4, name: 'Detective 2' },
  { id: 'avatar-5', image: avatar5, name: 'Anonymous 1' },
  { id: 'avatar-6', image: avatar6, name: 'Anonymous 2' },
  { id: 'avatar-7', image: avatar7, name: 'Sherlock 1' },
  { id: 'avatar-8', image: avatar8, name: 'Sherlock 2' },
  { id: 'avatar-9', image: avatar9, name: 'Conspiracy Theorist 1' },
  { id: 'avatar-10', image: avatar10, name: 'Conspiracy Theorist 2' },
  { id: 'avatar-11', image: avatar11, name: 'Shadow Ninja' },
  { id: 'avatar-12', image: avatar12, name: 'Mysterious Alien' },
];

export type AvatarData = typeof AVAILABLE_AVATARS[number];
