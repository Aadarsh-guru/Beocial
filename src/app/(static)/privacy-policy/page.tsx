

const PrivacyPolicy = () => {
    return (
        <div className="bg-background text-foreground">
            <div className="container mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
                <h1 className="mb-8 text-4xl font-bold">Privacy Policy</h1>
                <div className="space-y-8">
                    <section>
                        <h2 className="mb-4 text-2xl font-bold">Introduction</h2>
                        <p className="mb-4">
                            Your privacy is important to us. This Privacy Policy explains what information we collect and how we use it.
                        </p>
                    </section>
                    <section>
                        <h2 className="mb-4 text-2xl font-bold">Information Collection</h2>
                        <p className="mb-4">
                            We do not collect any personal information from our users. You can use our service without providing any personal data.
                        </p>
                    </section>
                    <section>
                        <h2 className="mb-4 text-2xl font-bold">Cookies and Tracking</h2>
                        <p className="mb-4">
                            Our application does not use cookies or any form of tracking to monitor your usage or collect data.
                        </p>
                    </section>
                    <section>
                        <h2 className="mb-4 text-2xl font-bold">Third-Party Services</h2>
                        <p className="mb-4">
                            We do not use third-party services that collect, store, or process user data.
                        </p>
                    </section>
                    <section>
                        <h2 className="mb-4 text-2xl font-bold">Data Security</h2>
                        <p className="mb-4">
                            Since we do not collect any personal data, we do not have any data to secure. However, we take reasonable measures to ensure the security of our application.
                        </p>
                    </section>
                    <section>
                        <h2 className="mb-4 text-2xl font-bold">User Responsibility</h2>
                        <p className="mb-4">
                            Users are responsible for their own interactions on the platform. We are not liable for any fraudulent activities, misuse of information, or exposure to inappropriate content including nudity and sexual violence. Engage at your own risk.
                        </p>
                    </section>
                    <section>
                        <h2 className="mb-4 text-2xl font-bold">Changes to Privacy Policy</h2>
                        <p className="mb-4">
                            We may update this Privacy Policy from time to time. Your continued use of the service after any changes constitutes your acceptance of the new policy.
                        </p>
                    </section>
                    <section>
                        <h2 className="mb-4 text-2xl font-bold">Contact Information</h2>
                        <p className="mb-4">
                            If you have any questions about this Privacy Policy, please contact us at - {process.env.NEXT_PUBLIC_ADMIN_EMAIL as string}.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;