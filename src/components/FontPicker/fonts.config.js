// Each entry: { id, name, file, previewText, category }
// category: 'myanmar' | 'english'

import MyanmarGantgawFont from '../../assets/fonts/MyanmarGantgaw.ttf';
import MyanmarSabaeFont from '../../assets/fonts/MyanmarSabae.ttf';
import MasterpieceUniHandFont from '../../assets/fonts/MasterpieceUniHand.ttf';
import Burma026 from '../../assets/fonts/Burma026.ttf';
import MyanmarAngoun from '../../assets/fonts/MyanmarAngoun.ttf';
import MyanmarPhiksel from '../../assets/fonts/MyanmarPhiksel.ttf';
import MyanmarSansPro from '../../assets/fonts/MyanmarSansPro.ttf';
import MyanmarSquare from '../../assets/fonts/MyanmarSquare.ttf';
import MyanmarSquareLight from '../../assets/fonts/MyanmarSquareLight.ttf';
import PyidaungsuBold from '../../assets/fonts/PyidaungsuBold.ttf';
import PyidaungsuRegular from '../../assets/fonts/PyidaungsuRegular.ttf';  
import Kamjing from '../../assets/fonts/Kamjing.ttf';
import MasterpieceDaung from '../../assets/fonts/MasterpieceDaung.ttf';
import MasterpieceSpringRev from '../../assets/fonts/MasterpieceSpringRev.ttf';
import MasterpieceStadium from '../../assets/fonts/MasterpieceStadium.ttf';
import MasterpieceTawWin from '../../assets/fonts/MasterpieceTawWin.ttf';
import MasterpieceUniRound from '../../assets/fonts/MasterpieceUniRound.ttf';
import MasterpieceUniType from '../../assets/fonts/MasterpieceUniType.ttf';
import MasterpieceYayChanZin from '../../assets/fonts/MasterpieceYayChanZin.ttf';
import Myanmar3 from '../../assets/fonts/Myanmar3.ttf';
import MyanmarChatu from '../../assets/fonts/MyanmarChatu.ttf';
import MyanmarChatuLight from '../../assets/fonts/MyanmarChatuLight.ttf';
import MyanmarKhyay from '../../assets/fonts/MyanmarKhyay.ttf';
import MyanmarKuttar from '../../assets/fonts/MyanmarKuttar.ttf';
import MyanmarPauklay from '../../assets/fonts/MyanmarPauklay.ttf';
import MyanmarSanpya from '../../assets/fonts/MyanmarSanpya.ttf';
import MyanmarTagu from '../../assets/fonts/MyanmarTagu.ttf';
import MyanmarWaso from '../../assets/fonts/MyanmarWaso.ttf';
import MyanmarYinmar from '../../assets/fonts/MyanmarYinmar.ttf';
import NotoSanMyanmar from '../../assets/fonts/NotoSanMyanmar.ttf';
import NotoSerifMyanmar from '../../assets/fonts/NotoSerifMyanmar.ttf';
import ThitSarShweSi from '../../assets/fonts/ThitSarShweSi.ttf';
import Yangon from '../../assets/fonts/Yangon.ttf';
import YoeYarOne from '../../assets/fonts/YoeYar-One.ttf';

export const MYANMAR_FONTS = [
  { id: 'PyidaungsuRegular', name: 'PyidaungsuRegular', file: PyidaungsuRegular, previewText: 'လက်ရေးလှလှရေးကြမယ်', category: 'myanmar' },
  { id: 'PyidaungsuBold', name: 'PyidaungsuBold', file: PyidaungsuBold, previewText: 'လက်ရေးလှလှရေးကြမယ်', category: 'myanmar' },
  { id: 'myanmar-gantgaw', name: 'MyanmarGantgaw', file: MyanmarGantgawFont, previewText: 'လက်ရေးလှလှရေးကြမယ်', category: 'myanmar' },
  { id: 'MyanmarSabae', name: 'MyanmarSabae', file: MyanmarSabaeFont, previewText: 'လက်ရေးလှလှရေးကြမယ်', category: 'myanmar' },
  { id: 'MasterpieceUniHand', name: 'MasterpieceUniHand', file: MasterpieceUniHandFont, previewText: 'လက်ရေးလှလှရေးကြမယ်', category: 'myanmar' },
  { id: 'Burma026', name: 'Burma026', file: Burma026, previewText: 'လက်ရေးလှလှရေးကြမယ်', category: 'myanmar' },
  { id: 'MyanmarAngoun', name: 'MyanmarAngoun', file: MyanmarAngoun, previewText: 'လက်ရေးလှလှရေးကြမယ်', category: 'myanmar' },
  { id: 'MyanmarPhiksel', name: 'MyanmarPhiksel', file: MyanmarPhiksel, previewText: 'လက်ရေးလှလှရေးကြမယ်', category: 'myanmar' },
  { id: 'MyanmarSansPro', name: 'MyanmarSansPro', file: MyanmarSansPro, previewText: 'လက်ရေးလှလှရေးကြမယ်', category: 'myanmar' },
  { id: 'MyanmarSquare', name: 'MyanmarSquare', file: MyanmarSquare, previewText: 'လက်ရေးလှလှရေးကြမယ်', category: 'myanmar' },
  { id: 'MyanmarSquareLight', name: 'MyanmarSquareLight', file: MyanmarSquareLight, previewText: 'လက်ရေးလှလှရေးကြမယ်', category: 'myanmar' },
  { id: 'Kamjing', name: 'Kamjing', file: Kamjing, previewText: 'လက်ရေးလှလှရေးကြမယ်', category: 'myanmar' },
  { id: 'MasterpieceDaung', name: 'MasterpieceDaung', file: MasterpieceDaung, previewText: 'လက်ရေးလှလှရေးကြမယ်', category: 'myanmar' },
  { id: 'MasterpieceSpringRev', name: 'MasterpieceSpringRev', file: MasterpieceSpringRev, previewText: 'လက်ရေးလှလှရေးကြမယ်', category: 'myanmar' },
  { id: 'MasterpieceStadium', name: 'MasterpieceStadium', file: MasterpieceStadium, previewText: 'လက်ရေးလှလှရေးကြမယ်', category: 'myanmar' },
  { id: 'MasterpieceTawWin', name: 'MasterpieceTawWin', file: MasterpieceTawWin, previewText: 'လက်ရေးလှလှရေးကြမယ်', category: 'myanmar' },
  { id: 'MasterpieceUniRound', name: 'MasterpieceUniRound', file: MasterpieceUniRound, previewText: 'လက်ရေးလှလှရေးကြမယ်', category: 'myanmar' },
  { id: 'MasterpieceUniType', name: 'MasterpieceUniType', file: MasterpieceUniType, previewText: 'လက်ရေးလှလှရေးကြမယ်', category: 'myanmar' },
  { id: 'MasterpieceYayChanZin', name: 'MasterpieceYayChanZin', file: MasterpieceYayChanZin, previewText: 'လက်ရေးလှလှရေးကြမယ်', category: 'myanmar' },
  { id: 'Myanmar3', name: 'Myanmar3', file: Myanmar3, previewText: 'လက်ရေးလှလှရေးကြမယ်', category: 'myanmar' },
  { id: 'MyanmarChatu', name: 'MyanmarChatu', file: MyanmarChatu, previewText: 'လက်ရေးလှလှရေးကြမယ်', category: 'myanmar' },
  { id: 'MyanmarChatuLight', name: 'MyanmarChatuLight', file: MyanmarChatuLight, previewText: 'လက်ရေးလှလှရေးကြမယ်', category: 'myanmar' },
  { id: 'MyanmarKhyay', name: 'MyanmarKhyay', file: MyanmarKhyay, previewText: 'လက်ရေးလှလှရေးကြမယ်', category: 'myanmar' },
  { id: 'MyanmarKuttar', name: 'MyanmarKuttar', file: MyanmarKuttar, previewText: 'လက်ရေးလှလှရေးကြမယ်', category: 'myanmar' },
  { id: 'MyanmarPauklay', name: 'MyanmarPauklay', file: MyanmarPauklay, previewText: 'လက်ရေးလှလှရေးကြမယ်', category: 'myanmar' },
  { id: 'MyanmarSanpya', name: 'MyanmarSanpya', file: MyanmarSanpya, previewText: 'လက်ရေးလှလှရေးကြမယ်', category: 'myanmar' },
  { id: 'MyanmarTagu', name: 'MyanmarTagu', file: MyanmarTagu, previewText: 'လက်ရေးလှလှရေးကြမယ်', category: 'myanmar' },
  { id: 'MyanmarWaso', name: 'MyanmarWaso', file: MyanmarWaso, previewText: 'လက်ရေးလှလှရေးကြမယ်', category: 'myanmar' },
  { id: 'MyanmarYinmar', name: 'MyanmarYinmar', file: MyanmarYinmar, previewText: 'လက်ရေးလှလှရေးကြမယ်', category: 'myanmar' },
  { id: 'NotoSanMyanmar', name: 'NotoSanMyanmar', file: NotoSanMyanmar, previewText: 'လက်ရေးလှလှရေးကြမယ်', category: 'myanmar' },
  { id: 'NotoSerifMyanmar', name: 'NotoSerifMyanmar', file: NotoSerifMyanmar, previewText: 'လက်ရေးလှလှရေးကြမယ်', category: 'myanmar' },
  { id: 'ThitSarShweSi', name: 'ThitSarShweSi', file: ThitSarShweSi, previewText: 'လက်ရေးလှလှရေးကြမယ်', category: 'myanmar' },
  { id: 'Yangon', name: 'Yangon', file: Yangon, previewText: 'လက်ရေးလှလှရေးကြမယ်', category: 'myanmar' },
  { id: 'YoeYarOne', name: 'YoeYarOne', file: YoeYarOne, previewText: 'လက်ရေးလှလှရေးကြမယ်', category: 'myanmar' },
];

import GoogleSans from '../../assets/fonts/eng/GoogleSans-Regular.ttf';
import Inter from '../../assets/fonts/eng/Inter_24pt-Regular.ttf';
import Orbitron from '../../assets/fonts/eng/Orbitron-Regular.ttf';
import Oswald from '../../assets/fonts/eng/Oswald-Regular.ttf';
import Roboto from '../../assets/fonts/eng/Roboto-Regular.ttf';
import SpaceGrotesk from '../../assets/fonts/eng/SpaceGrotesk-Regular.ttf';
import SpaceMono from '../../assets/fonts/eng/SpaceMono-Regular.ttf';

export const ENGLISH_FONTS = [
  { id: 'ui-system', name: 'System UI', file: null, previewText: 'PonSarYay', category: 'english' },
  { id: 'GoogleSans', name: 'Google Sans', file: GoogleSans, previewText: 'PonSarYay', category: 'english' },
  { id: 'Inter', name: 'Inter', file: Inter, previewText: 'PonSarYay', category: 'english' },
  { id: 'Orbitron', name: 'Orbitron', file: Orbitron, previewText: 'PonSarYay', category: 'english' },
  { id: 'Oswald', name: 'Oswald', file: Oswald, previewText: 'PonSarYay', category: 'english' },
  { id: 'Roboto', name: 'Roboto', file: Roboto, previewText: 'PonSarYay', category: 'english' },
  { id: 'SpaceGrotesk', name: 'SpaceGrotesk', file: SpaceGrotesk, previewText: 'PonSarYay', category: 'english' },
  { id: 'SpaceMono', name: 'Space Mono', file: SpaceMono, previewText: 'PonSarYay', category: 'english' },
];

