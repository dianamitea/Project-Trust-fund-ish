// prettier-ignore
const styles = {
  dashboardHeaderContainer: 'dashboard-header-container flex flex-col p-8 lg:p-10 justify-center items-center gap-6 self-stretch',
  dashboardHeaderTitle: 'dashboard-header-title text-primary transition-all duration-300 text-center text-3xl xs:text-5xl lg:text-6xl font-medium',
  dashboardHeaderDescription: 'dashboard-header-description text-secondary transition-all duration-300 text-center text-base xs:text-lg lg:text-xl font-medium',
} satisfies Record<string, string>;

export const DashboardHeader = () => (
  <div className={styles.dashboardHeaderContainer}>
    <div className={styles.dashboardHeaderTitle}>Legacy Lock Vault</div>
    <div className={styles.dashboardHeaderDescription}>
      A decentralised time-locked escrow on MultiversX. Lock your xEGLD for a
      chosen duration — the smart contract enforces the release only after the
      unlock timestamp has passed.
    </div>
  </div>
);
