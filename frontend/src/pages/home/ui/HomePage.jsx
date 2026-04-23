import HeroBanner from '../../../widgets/hero-banner/ui/HeroBanner'
import SeasonCollection from '../../../widgets/season-collection/ui/SeasonCollection'
import MasterClass from '../../../widgets/master-class/ui/MasterClass'
import Designers from '../../../widgets/designers/ui/Designers'
import ForYou from '../../../widgets/for-you/ui/ForYou'
import AlsoCheck from '../../../widgets/also-check/ui/AlsoCheck'

export default function HomePage() {
  return (
    <main>
      <HeroBanner />
      <SeasonCollection />
      <MasterClass />
      <Designers />
      <ForYou />
      <AlsoCheck />
    </main>
  )
}
