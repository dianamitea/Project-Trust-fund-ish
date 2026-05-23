#![no_std]

multiversx_sc::imports!();

#[multiversx_sc::contract]
pub trait LegacyLock {
    #[init]
    fn init(&self) {}

    #[endpoint(lockFunds)]
    #[payable("*")]
    fn lock_funds(&self, unlock_timestamp: u64) {
        let payment = self.call_value().egld();
        let caller = self.blockchain().get_caller();
        
        // Use the method suggested by the compiler
        let current_time = self.blockchain().get_block_timestamp_seconds().as_u64_seconds();

        require!(unlock_timestamp > current_time, "Unlock time must be in the future!");
        require!(*payment > 0, "You must lock some EGLD!");

        self.locked_amount(&caller).update(|amount| *amount += &*payment);
        self.unlock_time(&caller).set(unlock_timestamp);
    }

    #[endpoint(withdraw)]
    fn withdraw(&self) {
        let caller = self.blockchain().get_caller();
        let unlock_time = self.unlock_time(&caller).get();
        let current_time = self.blockchain().get_block_timestamp_seconds().as_u64_seconds();

        require!(current_time >= unlock_time, "Funds are still locked! Patience!");
        
        let amount = self.locked_amount(&caller).get();
        require!(amount > 0, "No funds available to withdraw.");

        self.locked_amount(&caller).clear();
        self.unlock_time(&caller).clear();
        
        self.send().direct_egld(&caller, &amount);
    }

    #[view(getLockedAmount)]
    #[storage_mapper("lockedAmount")]
    fn locked_amount(&self, address: &ManagedAddress) -> SingleValueMapper<BigUint>;

    #[view(getUnlockTime)]
    #[storage_mapper("unlockTime")]
    fn unlock_time(&self, address: &ManagedAddress) -> SingleValueMapper<u64>;
}