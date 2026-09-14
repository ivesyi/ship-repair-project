import './styles/tokens.css';
import './styles/base.css';
import './styles/animations.css';
import { Stage } from './components/Stage';
import { ProgressBar } from './components/ProgressBar';
import { useStepper } from './hooks/useStepper';
import { Presenter } from './components/Presenter';
import { CHAPTERS } from './registry/chapters';
export default function App(){const s=useStepper(CHAPTERS);const c=CHAPTERS[s.cursor.chapter];const C=c.Component;return <><Stage onAdvance={s.next}><div className="scene"><C key={c.id+':'+s.cursor.step} step={s.cursor.step}/></div></Stage><ProgressBar chapters={CHAPTERS} cursor={s.cursor} onJumpChapter={s.jumpToChapter}/><Presenter chapters={CHAPTERS} cursor={s.cursor} jump={s.jumpToChapter}/></>}
