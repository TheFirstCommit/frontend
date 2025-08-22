import { useNavigate, useLocation } from 'react-router-dom'
import Icon_Home_Off from '@/assets/Icons/Property 1=home, Property 2=off.svg'
import Icon_Home_On from '@/assets/Icons/Property 1=home, Property 2=on.svg'
import Icon_Family_Off from '@/assets/Icons/Property 1=family, Property 2=off.svg'
import Icon_Family_On from '@/assets/Icons/Property 1=family, Property 2=on.svg'
import Icon_Postbox_Off from '@/assets/Icons/Property 1=postbox, Property 2=off.svg'
import Icon_Postbox_On from '@/assets/Icons/Property 1=postbox, Property 2=on.svg'
import Icon_Mypage_Off from '@/assets/Icons/Property 1=mypage, Property 2=off.svg'
import Icon_Mypage_On from '@/assets/Icons/Property 1=mypage, Property 2=on.svg'
import Icon_Posting from '@/assets/Icons/nav_posting.svg'

/*const HIDE_TAB_ROUTES = ["/layouts", "/layouts/*"]; //하단 nav바 숨기는 페이지
function matchPath(pathname: string, patterns: string[]) {
  return patterns.some((p) => {
    if (p.endsWith("/*")) {
      const base = p.slice(0, -1); // "/*" 제거
      return pathname.startsWith(base);
    }
    return pathname === p;
  });
}*/

export const NavBar: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const isActive = (path: string) => {
    return location.pathname === path
  }

  const handleTabClick = (path: string) => {
    navigate(path)
  }

  const handlePostingClick = () => {
    navigate('/posting') // 포스팅 페이지로 이동
  }

  /*const hideTab = matchPath(location.pathname, HIDE_TAB_ROUTES)*/

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-sm bg-white border-t-2 border-gray-200 rounded-tl-3xl rounded-tr-3xl">
        <div className="flex justify-around items-center h-[83px] px-4 relative gap-14">
            <div className='flex justify-between items-center gap-12'>
                {/* 홈 탭 */}
                <div
                    className={`flex flex-col items-center cursor-pointer ${isActive('/home') ? 'text-gray-900' : 'text-gray-400'}`}
                    onClick={() => handleTabClick('/home')}
                >
                    <img
                    src={isActive('/home') ? Icon_Home_On : Icon_Home_Off}
                    alt="home"
                    className="w-12 h-15"
                    />
                </div>

                {/* 가족그룹 탭 */}
                <div
                    className={`flex flex-col items-center cursor-pointer ${isActive('/my-family') ? 'text-gray-900' : 'text-gray-400'}`}
                    onClick={() => handleTabClick('/my-family')}
                >
                    <img
                    src={isActive('/my-family') ? Icon_Family_On : Icon_Family_Off}
                    alt="family"
                    className="w-12 h-15"
                    />
                </div>
            </div>

            <div className='absolute bottom-[46px]'>
                {/* 포스팅 버튼 (중앙) */}
                <div
                    className="cursor-pointer transform -translate-y-2"
                    onClick={() => handleTabClick('/posting')}
                >
                    <img
                    src={Icon_Posting}
                    alt="posting"
                    className="w-14 h-14"
                    />
                </div>
            </div>


          <div className='flex justify-between items-center gap-12'>
            {/* 우편함 탭 */}
            <div
                className={`flex flex-col items-center cursor-pointer ${isActive('/postbox') ? 'text-gray-900' : 'text-gray-400'}`}
                onClick={() => handleTabClick('/postbox')}
            >
                <img
                src={isActive('/postbox') ? Icon_Postbox_On : Icon_Postbox_Off}
                alt="postbox"
                className="w-12 h-15"
                />
            </div>

            {/* 마이페이지 탭 */}
            <div
                className={`flex flex-col items-center cursor-pointer ${isActive('/mypage') ? 'text-gray-900' : 'text-gray-400'}`}
                onClick={() => handleTabClick('/mypage')}
            >
                <img
                src={isActive('/mypage') ? Icon_Mypage_On : Icon_Mypage_Off}
                alt="mypage"
                className="w-12 h-15"
                />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
