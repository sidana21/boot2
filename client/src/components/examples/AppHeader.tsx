import AppHeader from '../AppHeader';

export default function AppHeaderExample() {
  return (
    <AppHeader 
      onMenuClick={() => console.log('Menu clicked')}
      notificationCount={3}
      balance={25.50}
    />
  );
}
