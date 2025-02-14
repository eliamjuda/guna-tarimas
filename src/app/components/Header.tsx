import styles from '@/app/ui/header.module.css'
import Image from 'next/image'

export function Header () {
    return (
        <header className={styles.header}>
            <div className={styles.title}>
                <Image width="70" height="50" src="/logo_guna.png" alt='Logo Guna'/>
                <h1 className='ml-4'>Inventario de Tarimas</h1>
            </div>
            <div className={styles.info}>
                <div className={styles.photo}></div>
                <div className={styles.userInfo}>
                    <p className={styles.userInfoName}>Eliam Castillo</p>
                    <span className={styles.userInfoType}>Gerente</span>
                </div>
                <svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  className=" mt-[30px] ml-[5px] icon icon-tabler icons-tabler-outline icon-tabler-chevron-down"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 9l6 6l6 -6" /></svg>
            </div>
        </header>
    )
}