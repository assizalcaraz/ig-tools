<script>
	import BaseLayout from '$lib/components/base-layout.svelte';
	import { page } from '$app/stores';
	import { 
		BarChart3, 
		Scissors, 
		Home,
		Settings
	} from 'lucide-svelte';

	$: currentPath = $page.url.pathname;
	
	$: sidebarItems = [
		{
			href: '/',
			label: 'Inicio',
			icon: Home,
			active: currentPath === '/'
		},
		{
			href: '/dashboard',
			label: 'Dashboard',
			icon: BarChart3,
			active: currentPath.startsWith('/dashboard')
		},
		{
			href: '/scraper',
			label: 'Scraper',
			icon: Scissors,
			active: currentPath.startsWith('/scraper')
		},
		{
			href: '/settings',
			label: 'Configuración',
			icon: Settings,
			active: currentPath === '/settings'
		}
	];
</script>

<BaseLayout title="Instagram Tools" showHeader={true} showSidebar={true} {sidebarItems}>
	<slot />
</BaseLayout> 