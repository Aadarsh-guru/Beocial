

const TermsAndConditions = () => {
    return (
        <div className="bg-background text-foreground">
            <div className="container mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
                <h1 className="mb-8 text-4xl font-bold">Terms and Conditions</h1>
                <div className="space-y-8">
                    <section>
                        <h2 className="mb-4 text-2xl font-bold">Acceptance of Terms</h2>
                        <p className="mb-4">
                            By using our application, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our service.
                        </p>
                    </section>
                    <section>
                        <h2 className="mb-4 text-2xl font-bold">Use of Service</h2>
                        <p className="mb-4">
                            You are responsible for your use of the service and for any content you share. You agree not to use the service for any unlawful or harmful activities.
                        </p>
                    </section>
                    <section>
                        <h2 className="mb-4 text-2xl font-bold">No Account Requirement</h2>
                        <p className="mb-4">
                            Our service does not require you to create an account or provide any personal information. Your usage remains anonymous.
                        </p>
                    </section>
                    <section>
                        <h2 className="mb-4 text-2xl font-bold">Content and Conduct</h2>
                        <p className="mb-4">
                            You agree not to share any content that is illegal, offensive, or harmful. We reserve the right to remove any content that violates these terms. As this is a social and global platform, we do not regulate the content shared by users. We are not responsible for any fraudulent activities, misuse of information, or exposure to inappropriate content including nudity and sexual violence.
                        </p>
                    </section>
                    <section>
                        <h2 className="mb-4 text-2xl font-bold">Limitation of Liability</h2>
                        <p className="mb-4">
                            Our service is provided &quot;as is&quot; without any warranties. We will not be liable for any damages arising from the use of our service. We do not offer any guarantees regarding the safety or reliability of interactions on the platform. Users engage at their own risk.
                        </p>
                    </section>
                    <section>
                        <h2 className="mb-4 text-2xl font-bold">Termination and Changes</h2>
                        <p className="mb-4">
                            We reserve the right to terminate or suspend your access to the service at our sole discretion, without notice, for conduct that we believe violates these terms or is harmful to other users. We also reserve the right to shut down the service or introduce advertisements to manage the application at any time.
                        </p>
                    </section>
                    <section>
                        <h2 className="mb-4 text-2xl font-bold">Changes to Terms</h2>
                        <p className="mb-4">
                            We may update these Terms and Conditions from time to time. Your continued use of the service after any changes constitutes your acceptance of the new terms.
                        </p>
                    </section>
                    <section>
                        <h2 className="mb-4 text-2xl font-bold">Contact Information</h2>
                        <p className="mb-4">
                            If you have any questions about these Terms and Conditions, please contact us at - {process.env.NEXT_PUBLIC_ADMIN_EMAIL as string}.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default TermsAndConditions;
