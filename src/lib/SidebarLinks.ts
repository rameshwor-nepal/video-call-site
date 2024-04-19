import { FaCalendarCheck } from "react-icons/fa";
import { MdBroadcastOnPersonal, MdEmergencyRecording, MdHome } from "react-icons/md";
import { RiCalendarScheduleFill } from "react-icons/ri";

export const sideBarLinks = [
    {
        label: 'Home',
        route: '/',
        imgUrl: MdHome
    },
    {
        label: 'Upcoming',
        route: '/upcoming',
        imgUrl: RiCalendarScheduleFill  
    },
    {
        label: 'Previous',
        route: '/previous',
        imgUrl: FaCalendarCheck
    },
    {
        label: 'Recordings',
        route: '/recordings',
        imgUrl: MdEmergencyRecording
    },
    {
        label: 'Personal Room',
        route: '/personal-room',
        imgUrl: MdBroadcastOnPersonal
    },
]

export const avatarImages = [
    '/avatar-1.jpeg',
    '/avatar-2.jpeg',
    '/avatar-3.png',
    '/avatar-4.png',
    '/avatar-5.png',
]