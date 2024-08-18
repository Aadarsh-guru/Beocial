

const Disclaimer = () => {
    return (
        <div className="bg-background text-foreground">
            <div className="container mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
                <h1 className="mb-8 text-4xl font-bold">Disclaimer</h1>
                <div className="space-y-8">
                    <section>
                        <h2 className="mb-4 text-2xl font-bold">No Guarantees</h2>
                        <p className="mb-4">
                            The information and services provided on this platform are on an &quot;as is&quot; and &quot;as available&quot; basis without any warranties or guarantees of any kind. We do not guarantee the accuracy, reliability, or completeness of any information or service provided through the platform. Use of the platform is at your own risk.
                        </p>
                    </section>
                    <section>
                        <h2 className="mb-4 text-2xl font-bold">User Responsibility</h2>
                        <p className="mb-4">
                            Users are solely responsible for their interactions and conduct on the platform. We do not monitor or regulate the content shared by users. We are not liable for any damages, including but not limited to fraud, misuse of information, exposure to inappropriate content, including nudity and sexual violence, or any other harmful activities.
                        </p>
                    </section>
                    <section>
                        <h2 className="mb-4 text-2xl font-bold">No Professional Advice</h2>
                        <p className="mb-4">
                            The platform does not provide professional advice of any kind. Any information received through the platform should not be considered as professional advice. Users should seek independent professional advice where necessary.
                        </p>
                    </section>
                    <section>
                        <h2 className="mb-4 text-2xl font-bold">External Links</h2>
                        <p className="mb-4">
                            The platform may contain links to external websites or services that are not provided or maintained by us. We do not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.
                        </p>
                    </section>
                    <section>
                        <h2 className="mb-4 text-2xl font-bold">Limitation of Liability</h2>
                        <p className="mb-4">
                            To the fullest extent permitted by law, we disclaim any liability for any direct, indirect, incidental, special, consequential, or punitive damages that may result from the use of, or inability to use, the platform, including but not limited to loss of data, personal injury, or financial loss.
                        </p>
                    </section>
                    <section>
                        <h2 className="mb-4 text-2xl font-bold">Service Changes</h2>
                        <p className="mb-4">
                            We reserve the right to modify or discontinue, temporarily or permanently, the service (or any part of it) at any time without notice. We will not be liable to you or any third party for any modification, suspension, or discontinuation of the service.
                        </p>
                    </section>
                    <section>
                        <h2 className="mb-4 text-2xl font-bold">Contact Information</h2>
                        <p className="mb-4">
                            If you have any questions about this Disclaimer, please contact us at - {process.env.NEXT_PUBLIC_ADMIN_EMAIL as string}.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Disclaimer;
