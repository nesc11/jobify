import { Link } from 'react-router-dom';

import Wrapper from '../assets/wrappers/LandingPage';
import main from '../assets/images/main.svg';
import { Logo } from '../components';

export default function Landing() {
	return (
		<Wrapper>
			<nav>
				<Logo />
			</nav>
			<div className='container page'>
				<div className='info'>
					<h1>
						job <span>tracking</span> app
					</h1>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
						eum maxime voluptatem perferendis laudantium aperiam hic dolorem
						nam. Facilis dolorum, deserunt blanditiis quibusdam quidem vitae ad
						fugiat. Eligendi, animi autem!
					</p>
					<Link to='/register' className='btn register-link'>
						Register
					</Link>
					<Link to='/login' className='btn'>
						Login / Demo user
					</Link>
				</div>
				<img src={main} alt='job hunt' className='img main-img' />
			</div>
		</Wrapper>
	);
}
